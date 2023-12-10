package main

import (
	"fmt"
	"log"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/xV0lk/htmx-go/db"
	"github.com/xV0lk/htmx-go/views"
)

func main() {
	_, err := db.MongoConnect()
	if err != nil {
		log.Fatal(err)
		return
	}
	sqlDb, err := db.NewSQLite()
	if err != nil {
		log.Fatal(err)
		return
	}
	defer sqlDb.Close()
	err = sqlDb.Setup()
	if err != nil {
		log.Fatal(err)
		return
	}
	items, err := sqlDb.FetchTasks()
	if err != nil {
		log.Fatal(err)
		return
	}
	fmt.Printf("Fetched items: %v\n", items)

	// err = db.OpenDB()
	// if err != nil {
	// 	log.Fatal(err)
	// 	return
	// }
	// defer db.DB.Close()
	// err = db.DB.Ping()
	// if err != nil {
	// 	log.Fatal(err)
	// 	return
	// }
	// err = db.SetupDB()
	// if err != nil {
	// 	log.Fatal(err)
	// 	return
	// }

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
