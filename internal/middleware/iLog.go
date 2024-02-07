package middleware

import (
	"log/slog"
	"net/http"

	"github.com/xV0lk/htmx-go/internal/ctx"
	"github.com/xV0lk/htmx-go/types"
)

func ILog(log *slog.Logger) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		fn := func(w http.ResponseWriter, r *http.Request) {
			var user types.User
			u := ctx.Value[types.User](r.Context())
			if u != nil {
				user = *u
			}
			newLog := log.With(
				slog.Group("Request",
					slog.String("method", r.Method),
					slog.String("path", r.URL.Path),
					slog.Any("user", user),
				)).WithGroup("response")
			slog.SetDefault(newLog)
			next.ServeHTTP(w, r)
		}
		return http.HandlerFunc(fn)
	}
}