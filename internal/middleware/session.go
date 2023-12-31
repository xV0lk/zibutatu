package middleware

import (
	"context"
	"net/http"
)

// SessionCtx is a middleware that checks if a session cookie is present in the request,
// if it is, it sets a context value to true, otherwise it sets it to false
//
// This is useful to check if a user is logged in or not inside the templates.
func SessionCtx(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Create root template
		ck := "session"
		nCtx := context.WithValue(r.Context(), ck, true)
		_, err := r.Cookie(ck)
		if err != nil {
			nCtx = context.WithValue(r.Context(), ck, false)
		}
		next.ServeHTTP(w, r.WithContext(nCtx))
		return
	})
}
