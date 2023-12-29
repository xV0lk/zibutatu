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
	// var appList []*types.Appointment
	// appPaola := &types.Appointment{
	// 	ID:     1,
	// 	Client: "Paola Taborda",
	// 	Phone:  "312 425 4321",
	// 	Email:  "paola.taborda@example.com",
	// 	Artist: "Juanita",
	// 	Day:    27,
	// 	Month:  "Diciembre",
	// }

	// appJorge := &types.Appointment{
	// 	ID:     2,
	// 	Client: "Jorge Rojas",
	// 	Phone:  "317 376 8552",
	// 	Email:  "jorge.rojas@example.com",
	// 	Artist: "Juanita",
	// 	Day:    15,
	// 	Month:  "Enero",
	// }

	// appDiego := &types.Appointment{
	// 	ID:     3,
	// 	Client: "Diego Taborda",
	// 	Phone:  "321 234 5298",
	// 	Email:  "diego.taborda@example.com",
	// 	Artist: "Juanita",
	// 	Day:    10,
	// 	Month:  "Febrero",
	// }
	// appMaria := &types.Appointment{
	// 	ID:     4,
	// 	Client: "María López",
	// 	Phone:  "318 765 4321",
	// 	Email:  "maria.lopez@example.com",
	// 	Artist: "Juanita",
	// 	Day:    20,
	// 	Month:  "Marzo",
	// }

	// appPedro := &types.Appointment{
	// 	ID:     5,
	// 	Client: "Pedro Ramírez",
	// 	Phone:  "315 987 6543",
	// 	Email:  "pedro.ramirez@example.com",
	// 	Artist: "Juanita",
	// 	Day:    5,
	// 	Month:  "Abril",
	// }

	// appLuisa := &types.Appointment{
	// 	ID:     6,
	// 	Client: "Luisa Fernández",
	// 	Phone:  "314 876 5432",
	// 	Email:  "luisa.fernandez@example.com",
	// 	Artist: "Juanita",
	// 	Day:    12
	// 	Month:  "Mayo",
	// }

	// appList = append(appList, appPaola, appJorge, appDiego, appMaria, appPedro, appLuisa)

	// // TODO: check if the user is logged in
	// home.HomeUser(appList).Render(r.Context(), w)
	home.HomeLogin().Render(r.Context(), w)
	return

}

func (h *AuthHandler) HandleLogin(w http.ResponseWriter, r *http.Request) {
	c := r.Context()
	var loginF types.AuthParams

	tBody := views.ToastBody{
		Msg:  mw.Translate(c, "Ocurrió un error"),
		Type: "error",
	}

	loginF.Email = r.FormValue("email")
	loginF.Password = r.FormValue("password")

	_, err := h.UserStore.AuthenticateUser(&loginF, c)
	if err != nil {
		tBody.Msg = err.Error()
		views.Toast(tBody, false, c, w, http.StatusBadRequest)
		fmt.Println("Error: ", err)
		return
	}

	// TODO: add the user to the session
	home.HomeLogin().Render(c, w)
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
