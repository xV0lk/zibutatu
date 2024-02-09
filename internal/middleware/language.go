package middleware

import (
	// Import the internal/translations so that it's init() function
	// is run. It's really important that we do this here so that the
	// default message catalog is updated to use our translations
	// *before* we initialize the message.Printer instances below.

	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/xV0lk/htmx-go/internal/ctx"
	_ "github.com/xV0lk/htmx-go/internal/translations"

	"golang.org/x/text/language"
	"golang.org/x/text/message"
)

// Localizer is a struct that holds the printer and language tag for a given locale
//
// It is used to translate messages into the target language.
type Localizer struct {
	Tag     language.Tag
	printer *message.Printer
}

var (
	esCo = language.MustParse("es-CO")
	enUS = language.MustParse("en-US")
)

// Initialize a slice which holds the initialized Localizer types for
// each of our supported locales.
var locales = []Localizer{
	{
		Tag:     esCo,
		printer: message.NewPrinter(esCo),
	},
	{
		Tag:     enUS,
		printer: message.NewPrinter(enUS),
	},
}

// The Get() function accepts a locale Tag and returns the corresponding
// Localizer for that locale. If the locale ID is not supported then
// this returns `false` as the second return value.
func Get(t language.Tag) (*Localizer, bool) {
	for _, locale := range locales {
		if t == locale.Tag {
			return &locale, true
		}
	}
	defLang, _ := Get(esCo)
	return defLang, false
}

// Translate translates a given message reference using the Localizer.
//
// The function takes a message reference of type `message.Reference` and optional arguments of type `...interface{}`.
// It returns a string that represents the translated message.
func (l Localizer) Translate(key message.Reference, args ...interface{}) string {
	s := l.printer.Sprintf(key, args...)
	return s
}

var matcher = language.NewMatcher([]language.Tag{
	language.MustParse("es-CO"),
	language.Spanish,
	language.LatinAmericanSpanish,
	language.English,
	language.MustParse("en-US"),
})

// GetLanguage is a middleware function that retrieves the language from the "Accept-Language" header of the incoming HTTP request.
//
// It updates the request context with the localized language.
func I18n(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if strings.Contains(r.URL.Path, "/static/") {
			next.ServeHTTP(w, r)
			return
		}
		acceptLanguage := r.Header.Get("Accept-Language")
		ul, _ := language.MatchStrings(matcher, acceptLanguage)
		l, _ := Get(ul)
		nCtx := ctx.With[Localizer](r.Context(), l)
		next.ServeHTTP(w, r.WithContext(nCtx))
	})
}

func T(c context.Context, key message.Reference, args ...interface{}) string {
	l := ctx.Value[Localizer](c)
	if l == nil {
		return fmt.Sprint(key)
	}
	return l.Translate(key, args...)
}
