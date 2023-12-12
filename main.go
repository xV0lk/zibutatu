package main

import (
	"log"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/xV0lk/htmx-go/api"
	"github.com/xV0lk/htmx-go/db"
	"github.com/xV0lk/htmx-go/views"
)

func main() {
	// _, err := db.MongoConnect()
	// if err != nil {
	// 	log.Fatal(err)
	// 	return
	// }
	sqlStore, err := db.NewSQLite()
	if err != nil {
		log.Fatal(err)
		return
	}
	defer sqlStore.Close()
	if err != nil {
		log.Fatal(err)
		return
	}

	// handlers
	var (
		tasksHandler = api.NewTasksHandler(sqlStore)
	)

	e := echo.New()
	e.Debug = true
	e.HTTPErrorHandler = api.CustomError
	e.Use(middleware.Logger())

	e.Static("static/", "assets")

	home := views.HomePage()

	e.GET("/", func(c echo.Context) error {
		return home.Render(c.Request().Context(), c.Response().Writer)
	})
	e.GET("/tasks", tasksHandler.HandleGetTasks)

	e.Logger.Fatal(e.Start(":1323"))
}
