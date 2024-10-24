package middleware

import (
	"net/http"

	"github.com/gorilla/csrf"
	"github.com/xV0lk/zibutatu/models"
)

// Csrf is a middleware function that adds CSRF protection to the HTTP handler.
// It generates a CSRF token and validates it on subsequent requests.
//
// If the CSRF token is invalid or missing, it returns a HTTP 403 Forbidden error.
func Csrf(cfg *models.CsrfConfig) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		fn := func(w http.ResponseWriter, r *http.Request) {
			secure := csrf.Secure(cfg.Secure)
			mw := csrf.Protect([]byte(cfg.Key), secure)
			mw(next).ServeHTTP(w, r)
		}
		return http.HandlerFunc(fn)
	}
}

// func GetCsrf(ctx context.Context) string {
// 	token, ok := ctx.Value("gorilla.csrf.Token").(string)
// 	if !ok {
// 		return ""
// 	}
// 	return token
// }
