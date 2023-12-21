package middleware

import (
	"net/http"

	"github.com/gorilla/schema"
	"github.com/xV0lk/htmx-go/internal/ctx"
)

// Decoder is a middleware that adds a schema decoder to the request context.
// It uses the schema.NewDecoder() function to create a new decoder.
// This allows downstream handlers to access the decoder and decode request parameters.
func Decoder(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var decoder = schema.NewDecoder()
		nCtx := ctx.With[schema.Decoder](r.Context(), decoder)
		next.ServeHTTP(w, r.WithContext(nCtx))
	})
}
