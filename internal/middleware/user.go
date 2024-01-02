package middleware

import (
	"net/http"

	"github.com/xV0lk/htmx-go/internal/ctx"
	"github.com/xV0lk/htmx-go/internal/db"
	"github.com/xV0lk/htmx-go/types"
)

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
				next.ServeHTTP(w, r)
				return
			}
			nCtx := ctx.With[types.User](r.Context(), user)
			r = r.WithContext(nCtx)
			next.ServeHTTP(w, r)
		}
		return http.HandlerFunc(fn)
	}
}
