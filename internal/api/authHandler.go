package api

import (
	"fmt"
	"net/http"
	"time"

	"github.com/go-chi/render"
	"github.com/gorilla/schema"
	"github.com/jackc/pgx/v5"
	"github.com/xV0lk/htmx-go/internal/db"
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

	return
}

func (h *AuthHandler) HandleAuth(w http.ResponseWriter, r *http.Request) {

	return
}

func (h *AuthHandler) HandleLogout(w http.ResponseWriter, r *http.Request) {

	return
}

func (h *AuthHandler) HandleNewUser(w http.ResponseWriter, r *http.Request) {
	user := &types.User{
		FirstName: "Jorge",
		LastName:  "Rojas",
		Email:     "jorge.otto.415@gmail.com",
		IsAdmin:   false,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		Language:  "es-CO",
		Password:  "Test",
	}

	err := h.UserStore.Login(user, r.Context())
	if err != nil {
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
