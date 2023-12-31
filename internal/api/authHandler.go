package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/go-chi/render"
	"github.com/gorilla/schema"
	"github.com/jackc/pgx/v5"
	"github.com/xV0lk/htmx-go/internal/db"
	mw "github.com/xV0lk/htmx-go/internal/middleware"
	"github.com/xV0lk/htmx-go/types"
	"github.com/xV0lk/htmx-go/views"
	home "github.com/xV0lk/htmx-go/views/home"
)

type AuthHandler struct {
	UserStore *db.UserStore
	decoder   *schema.Decoder
}

func NewAuthHandler(store *db.UserStore, decoder *schema.Decoder) *AuthHandler {
	return &AuthHandler{
		UserStore: store,
		decoder:   decoder,
	}
}

func (h *AuthHandler) HandleRoot(w http.ResponseWriter, r *http.Request) {
	// Create root template
	sCookie, err := r.Cookie(SessionCookie)
	if err != nil {
		fmt.Println("No session error, redirecting to login: ", err)
		http.Redirect(w, r, "/login", http.StatusFound)
		return
	}
	user, err := h.UserStore.Session.User(sCookie.Value)
	if err != nil {
		fmt.Println("No session error, redirecting to login: ", err)
		http.Redirect(w, r, "/login", http.StatusFound)
		return
	}
	fmt.Printf("-------------------------\nroot user: %+v\n", user)

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
		Type: "error",
	}

	loginF.Email = r.FormValue("email")
	loginF.Password = r.FormValue("password")

	user, err := h.UserStore.Auth.AuthenticateUser(&loginF, c)
	if err != nil {
		tBody.Msg = err.Error()
		views.Toast(tBody, false, c, w, http.StatusBadRequest)
		fmt.Println("Login Error: ", err)
		return
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
	println("Home")
	home.HomeLogin().Render(r.Context(), w)
	// views.Index().Render(r.Context(), w)
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
