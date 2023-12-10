package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/xV0lk/htmx-go/views"
)

func main() {
	e := echo.New()
	e.Debug = true
	e.Use(middleware.Logger())

	e.Static("static/", "assets")

	home := views.HomePage()
	e.GET("/", func(c echo.Context) error {
		// templ, err := template.New("").ParseFiles("views/index.html")
		// if err != nil {
		// 	return err
		// }
		return home.Render(c.Request().Context(), c.Response().Writer)
		// return templ.ExecuteTemplate(c.Response().Writer, "main", nil)
	})
	e.Logger.Fatal(e.Start(":1323"))
}
