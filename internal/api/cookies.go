package api

import "net/http"

const (
	SessionCookie = "session"
	CookieAge     = 60 * 60 * 24 // 1 day
)

func newCookie(name, value string) *http.Cookie {
	return &http.Cookie{
		Name:     name,
		Value:    value,
		HttpOnly: true,
		MaxAge:   CookieAge,
	}
}

func setCookie(w http.ResponseWriter, name, value string) {
	http.SetCookie(w, newCookie(name, value))
}
