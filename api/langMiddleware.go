package api

import (
	"fmt"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/xV0lk/htmx-go/internal/localizer"
	"golang.org/x/text/language"
)

var matcher = language.NewMatcher([]language.Tag{
	language.MustParse("es-CO"),
	language.Spanish,
	language.LatinAmericanSpanish,
	language.English,
	language.MustParse("en-US"),
})

// I18n is a middleware function that handles internationalization for the API.
//
// It retrieves the "Accept-Language" header from the request and matches it against a language matcher.
// The matched language is then set in the context under the key "lang".
func I18n(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		if strings.Contains(c.Path(), "static") || strings.Contains(c.Path(), "assets") {
			return next(c)
		}

		acceptLanguage := c.Request().Header.Get("Accept-Language")
		// TODO: check if is logged to get user lang from DB
		ul, _ := language.MatchStrings(matcher, acceptLanguage)
		l, ok := localizer.Get(ul)
		if !ok {
			return fmt.Errorf("invalid language")
		}
		c.Set("translate", l)
		return next(c)
	}
}

// ParseCtx parses the given key from the provided echo.Context and returns the value of type t.
//
// Parameters:
// - key: the key to parse from the context.
// - ctx: the echo.Context from which to parse the key.
//
// Returns:
// - error: an error if the key is not found or the value is of an invalid type.
// - t: the value parsed from the context.
func ParseCtx[t any](key string, ctx echo.Context) (error, t) {
	var vv t
	value := ctx.Get(key)
	if value != nil {
		if v, ok := value.(t); ok {
			vv = v
			return nil, v
		}
		return fmt.Errorf("invalid type"), vv
	}
	return fmt.Errorf("key not found"), vv
}
