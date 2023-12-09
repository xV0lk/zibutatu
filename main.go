package main

import (
	"html/template"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()
	e.Debug = true
	e.Use(middleware.Logger())

	e.Static("static/", "static/")

	e.GET("/", func(c echo.Context) error {
		templ, err := template.New("").ParseFiles("views/index.html")
		if err != nil {
			return err
		}
		return templ.ExecuteTemplate(c.Response().Writer, "main", nil)
	})
	e.Logger.Fatal(e.Start(":1323"))
}
