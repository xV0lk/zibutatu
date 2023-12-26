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
)

type AuthHandler struct {
	UserStore db.AuthStore
	decoder   *schema.Decoder
}

func NewAuthHandler(store db.AuthStore, decoder *schema.Decoder) *AuthHandler {
	return &AuthHandler{
		UserStore: store,
		decoder:   decoder,
	}
}

func (h *AuthHandler) HandleHome(w http.ResponseWriter, r *http.Request) {
	views.HomePage().Render(r.Context(), w)
	return

}

func (h *AuthHandler) HandleLogin(w http.ResponseWriter, r *http.Request) {
	var loginF types.AuthParams

	if err := r.ParseForm(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if err := h.decoder.Decode(&loginF, r.Form); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	user, err := h.UserStore.GetUserAuth(loginF.Email, r.Context())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if !types.IsValidPassword(user.Password, loginF.Password) {
		http.Error(w, "Invalid password", http.StatusBadRequest)
		return
	}

	user.Password = ""

	fmt.Printf("-------------------------\nuser: %+v\n", user)

	render.JSON(w, r, user)
	return
}

func (h *AuthHandler) HandleAuth(w http.ResponseWriter, r *http.Request) {

	return
}

func (h *AuthHandler) HandleLogout(w http.ResponseWriter, r *http.Request) {

	return
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

	err = h.UserStore.AddUser(user, r.Context())
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
	user, err := h.UserStore.FetchUser(1, r.Context())
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
