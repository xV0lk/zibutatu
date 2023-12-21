package api

import (
	"net/http"

	"github.com/xV0lk/htmx-go/internal/ctx"
	"github.com/xV0lk/htmx-go/internal/db"
	"github.com/xV0lk/htmx-go/internal/middleware"
	"github.com/xV0lk/htmx-go/views"
)

type AuthHandler struct {
	UserStore db.UserStore
}

func NewAuthHandler(store db.UserStore) *AuthHandler {
	return &AuthHandler{
		UserStore: store,
	}
}

func (h *AuthHandler) HandleHome(w http.ResponseWriter, r *http.Request) {
	l := ctx.Value[middleware.Localizer](r.Context())
	views.HomePage(l).Render(r.Context(), w)
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
