package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strings"

	"github.com/go-chi/render"
	"github.com/gorilla/schema"
	"github.com/jackc/pgx/v5"
	"github.com/xV0lk/htmx-go/internal/ctx"
	"github.com/xV0lk/htmx-go/internal/db"
	mw "github.com/xV0lk/htmx-go/internal/middleware"
	"github.com/xV0lk/htmx-go/types"
	"github.com/xV0lk/htmx-go/views"
	home "github.com/xV0lk/htmx-go/views/home"
	login "github.com/xV0lk/htmx-go/views/home/login"
)

type AuthHandler struct {
	UserStore    *db.UserStore
	decoder      *schema.Decoder
	emailService *types.EmailService
}

func NewAuthHandler(store *db.UserStore, decoder *schema.Decoder, emailService *types.EmailService) *AuthHandler {
	return &AuthHandler{
		UserStore:    store,
		decoder:      decoder,
		emailService: emailService,
	}
}

func (h *AuthHandler) HandleRoot(w http.ResponseWriter, r *http.Request) {
	// Create root template
	user := ctx.Value[types.User](r.Context())
	if user == nil {
		fmt.Println("No session error, redirecting to login: ")
		http.Redirect(w, r, "/login", http.StatusFound)
		return
	}

	http.Redirect(w, r, "/home", http.StatusFound)
	return
}

func (h *AuthHandler) HandleLogin(w http.ResponseWriter, r *http.Request) {
	home.HomeLogin().Render(r.Context(), w)
	return
}

func (h *AuthHandler) HandleAuthenticate(w http.ResponseWriter, r *http.Request) {
	c := r.Context()
	var loginF types.AuthParams

	tBody := views.ToastBody{
		Msg:  mw.Translate(c, "Ocurrió un error"),
		Type: views.ToastError,
	}

	loginF.Email = r.FormValue("email")
	loginF.Password = r.FormValue("password")

	user, err := h.UserStore.Auth.AuthenticateUser(&loginF, c)
	if err != nil {
		tBody.Msg = mw.Translate(c, "Usuario no encontrado")
		views.Toast(tBody, false, c, w, http.StatusBadRequest)
		fmt.Println("Login Error 1: ", err)
		return
	}
	if !types.IsValidPassword(user.Password, loginF.Password) {
		tBody.Msg = mw.Translate(c, "Contraseña incorrecta")
		views.Toast(tBody, false, c, w, http.StatusBadRequest)
		fmt.Println("Login Error 2: ", err)
	}

	session, err := h.UserStore.Session.Create(user.ID)
	if err != nil {
		views.Toast(tBody, false, c, w, http.StatusBadRequest)
		fmt.Println("Session Error: ", err)
		return
	}

	setCookie(w, SessionCookie, session.Token)
	w.Header().Add("HX-Redirect", "/home")
}

func (h *AuthHandler) HandleLogout(w http.ResponseWriter, r *http.Request) {
	sCookie, err := r.Cookie(SessionCookie)
	if err != nil {
		fmt.Println("No session error: ", err)
		w.Header().Add("HX-Redirect", "/login")
		return
	}
	err = h.UserStore.Session.Delete(sCookie.Value)
	if err != nil {
		fmt.Println("Error deleting session from DB: ", err)
		w.Header().Add("HX-Redirect", "/login")
		return
	}
	deleteCookie(w, SessionCookie)
	w.Header().Add("HX-Redirect", "/login")
	return
}

func (h *AuthHandler) HandleHome(w http.ResponseWriter, r *http.Request) {
	// home.HomeLogin().Render(r.Context(), w)
	views.Index().Render(r.Context(), w)
	// home.HomeUser().Render(r.Context(), w)
}

func (h *AuthHandler) HandleNewUser(w http.ResponseWriter, r *http.Request) {
	var newUser types.NewUser

	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if errors := newUser.Validate(r.Context()); len(errors) != 0 {
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, errors)
		return
	}

	user, err := types.NewUserFromParams(&newUser)
	if err != nil {
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, err)
		return
	}

	err = h.UserStore.Auth.AddUser(user, r.Context())
	if err != nil {
		if strings.Contains(err.Error(), "duplicate key value violates unique constraint") {
			http.Error(w, mw.Translate(r.Context(), "Email ya se encuentra registrado"), http.StatusBadRequest)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("User created"))
	return
}

func (h *AuthHandler) HandleGetUser(w http.ResponseWriter, r *http.Request) {
	user, err := h.UserStore.Auth.FetchUser(4, r.Context())
	if err == pgx.ErrNoRows {
		return
	}
	if err != nil {
		fmt.Println("Error: ", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	render.JSON(w, r, user)
	return
}

func (h *AuthHandler) HandleForgotPassword(w http.ResponseWriter, r *http.Request) {
	var data struct {
		Email string
	}
	data.Email = r.FormValue("email")
	fmt.Printf("-------------------------\ndata.Email : %s\n", data.Email)
	home.HomePasswordReset(data.Email).Render(r.Context(), w)
}

func (h *AuthHandler) HandleResetPassword(w http.ResponseWriter, r *http.Request) {
	c := r.Context()
	tBody := views.ToastBody{
		Msg:  mw.Translate(c, "Se han enviado las instrucciones para cambiar la contraseña a tu correo"),
		Type: views.ToastSuccess,
	}

	var data struct {
		Email string
	}
	data.Email = r.FormValue("email")

	pwReset, err := h.UserStore.PwReset.Create(data.Email)
	if err != nil {
		tBody.Msg = mw.Translate(c, err.Error())
		tBody.Type = views.ToastError
		views.Toast(tBody, false, c, w, http.StatusBadRequest)
		return
	}

	vals := url.Values{}
	vals.Add("token", pwReset.Token)
	resetUrl := "http://localhost:1323/reset-password?" + vals.Encode()

	err = h.emailService.ForgotPassword(data.Email, resetUrl)
	if err != nil {
		tBody.Msg = mw.Translate(c, "Ocurrió un error al enviar el correo de recuperación")
		tBody.Type = views.ToastError
		views.Toast(tBody, false, c, w, http.StatusBadRequest)
		return
	}

	login.CheckEmail().Render(c, w)
}

func (h *AuthHandler) HandleEmailToken(w http.ResponseWriter, r *http.Request) {
	var data struct {
		Token string
	}

	data.Token = r.FormValue("token")
	fmt.Printf("-------------------------\ndata.Token : %s\n", data.Token)
	home.HomePasswordResetDone(data.Token).Render(r.Context(), w)
}

func (h *AuthHandler) HandleChangePassword(w http.ResponseWriter, r *http.Request) {
	c := r.Context()
	tBody := views.ToastBody{
		Msg:  mw.Translate(c, "Ocurrió un error"),
		Type: views.ToastError,
	}

	var data struct {
		token    string
		password string
	}

	data.token = r.FormValue("token")
	data.password = r.FormValue("password")

	user, err := h.UserStore.PwReset.Consume(data.token)
	if err != nil {
		tBody.Msg = mw.Translate(c, "Token inválido")
		views.Toast(tBody, false, c, w, http.StatusBadRequest)
		return
	}

	// TODO: Change password

	session, err := h.UserStore.Session.Create(user.ID)
	if err != nil {
		views.Toast(tBody, false, c, w, http.StatusBadRequest)
		fmt.Println("Session Error: ", err)
		return
	}
	setCookie(w, SessionCookie, session.Token)

	http.Redirect(w, r, "/home", http.StatusFound)
}
