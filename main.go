package main

import (
	"fmt"
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
	psqlStore, err := db.NewPsql()
	if err != nil {
		log.Fatal(err)
		return
	}
	defer psqlStore.Close()
	fmt.Println("Connected to postgres")
	db.SetUpTables(psqlStore)

	// handlers
	var (
		tasksHandler = api.NewTasksHandler(psqlStore)
		authHandler  = api.NewAuthHandler(psqlStore)
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

	r.Get("/login", authHandler.HandleNewUser)
	r.Get("/users", authHandler.HandleGetUser)

	// Serve static files
	workDir, _ := os.Getwd()
	filesDir := http.Dir(filepath.Join(workDir, "assets"))
	api.FileServer(r, "/static", filesDir)

	http.ListenAndServe(":1323", r)
	println("Server running on port 1323")
}
