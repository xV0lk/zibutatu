package middleware

import (
	"net/http"
	"os"

	"github.com/gorilla/csrf"
)

// Csrf is a middleware function that adds CSRF protection to the HTTP handler.
// It generates a CSRF token and validates it on subsequent requests.
//
// If the CSRF token is invalid or missing, it returns a HTTP 403 Forbidden error.
func Csrf(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cs := os.Getenv("CSRF_SECRET")
		secure := csrf.Secure(false)
		mw := csrf.Protect([]byte(cs), secure)
		mw(next).ServeHTTP(w, r)
	})
}

// func GetCsrf(ctx context.Context) string {
// 	token, ok := ctx.Value("gorilla.csrf.Token").(string)
// 	if !ok {
// 		return ""
// 	}
// 	return token
// }
