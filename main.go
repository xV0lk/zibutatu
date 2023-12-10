package main

import (
	"log"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/xV0lk/htmx-go/views"
)

func main() {
	_, err := mongoConnect()
	if err != nil {
		log.Fatal(err)
		return
	}

	e := echo.New()
	e.Debug = true
	e.Use(middleware.Logger())

	e.Static("static/", "assets")

	home := views.HomePage()

	e.GET("/", func(c echo.Context) error {
		return home.Render(c.Request().Context(), c.Response().Writer)
	})
	e.Logger.Fatal(e.Start(":1323"))
}
