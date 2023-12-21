package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/go-chi/chi/v5"
	chiMiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/xV0lk/htmx-go/internal/api"
	"github.com/xV0lk/htmx-go/internal/db"
	"github.com/xV0lk/htmx-go/internal/middleware"
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
		authHandler  = api.NewAuthHandler(sqlStore)
	)

	r := chi.NewRouter()
	r.Use(chiMiddleware.Logger)
	r.Use(middleware.I18n)
	r.Use(middleware.Decoder)

	r.Get("/", authHandler.HandleHome)
	r.Route("/tasks", func(r chi.Router) {
		r.Get("/", tasksHandler.HandleGetTasks)
		r.Post("/", tasksHandler.HandlePostTask)
		r.Put("/{id}/toggle", tasksHandler.HandleToogleTask)
		r.Delete("/{id}", tasksHandler.HandleDeleteTask)
		r.Get("/{id}/edit", tasksHandler.HandleEditTask)
		r.Put("/{id}", tasksHandler.HandlePutTask)
	})

	// Serve static files
	workDir, _ := os.Getwd()
	filesDir := http.Dir(filepath.Join(workDir, "assets"))
	api.FileServer(r, "/static", filesDir)

	http.ListenAndServe(":1323", r)
	println("Server running on port 1323")
}

// e := echo.New()
// e.Use(api.I18n)
// e.Debug = true
// e.HTTPErrorHandler = api.CustomError
// e.Use(middleware.LoggerWithConfig(api.LConfig))

// e.Static("static/", "assets")
// e.File("assets/favicon.png", "assets/favicon.png")
// e.File("assets/machine.png", "assets/machine.png")
// e.File("assets/machine-lg.png", "assets/machine-lg.png")

// e.GET("/", authHandler.HandleHome)
// e.GET("/tasks", tasksHandler.HandleGetTasks)
// e.POST("/tasks", tasksHandler.HandlePostTask)
// e.PUT("/tasks/:id/toggle", tasksHandler.HandleToogleTask)
// e.DELETE("/tasks/:id", tasksHandler.HandleDeleteTask)
// e.GET("/tasks/:id/edit", tasksHandler.HandleEditTask)
// e.PUT("/tasks/:id", tasksHandler.HandlePutTask)

// e.GET("/auth/:provider", authHandler.HandleAuth)
// e.GET("/auth/:provider/callback", authHandler.HandleLogin)
// e.GET("/logout/:provider", authHandler.HandleLogout)

// e.Logger.Fatal(e.Start(":1323"))
