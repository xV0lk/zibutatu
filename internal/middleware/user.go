package middleware

import (
	"log/slog"
	"net/http"

	"github.com/xV0lk/zibutatu/internal/ctx"
	"github.com/xV0lk/zibutatu/internal/db"
	"github.com/xV0lk/zibutatu/models"
)

// User is a middleware function that retrieves the user from the session and adds it to the request context.
//
// It takes a UserStore as a parameter and returns a function that can be used as middleware in an HTTP handler chain.
func User(us *db.UserStore) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		fn := func(w http.ResponseWriter, r *http.Request) {
			ck := "session"
			cookie, err := r.Cookie(ck)
			if err != nil {
				next.ServeHTTP(w, r)
				return
			}
			user, err := us.Session.User(cookie.Value)
			if err != nil {
				slog.Error("MW: Unable to get user from session: ",
					slog.String("error", err.Error()),
				)
				next.ServeHTTP(w, r)
				return
			}
			nCtx := ctx.With[models.User](r.Context(), user)
			r = r.WithContext(nCtx)
			next.ServeHTTP(w, r)
		}
		return http.HandlerFunc(fn)
	}
}
