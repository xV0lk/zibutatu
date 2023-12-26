package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/go-chi/chi/v5"
	chiMiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/gorilla/schema"
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

	var (
		// Stores
		decoder   = schema.NewDecoder()
		authStore = db.NewPsAuthStore(psqlStore)
		taskStore = db.NewPsTaskStore(psqlStore)
		// handlers
		tasksHandler = api.NewTasksHandler(taskStore, decoder)
		authHandler  = api.NewAuthHandler(authStore, decoder)
		// Connection
		port = flag.String("port", ":1323", "port to run the server on")
		r    = chi.NewRouter()
	)

	r.Use(chiMiddleware.Logger)
	r.Use(middleware.I18n)

	r.Get("/", authHandler.HandleHome)
	r.Route("/tasks", func(r chi.Router) {
		r.Get("/", tasksHandler.HandleGetTasks)
		r.Post("/", tasksHandler.HandlePostTask)
		r.Put("/{id}/toggle", tasksHandler.HandleToogleTask)
		r.Delete("/{id}", tasksHandler.HandleDeleteTask)
		r.Get("/{id}/edit", tasksHandler.HandleEditTask)
		r.Put("/{id}", tasksHandler.HandlePutTask)
	})

	r.Post("/users", authHandler.HandleNewUser)
	r.Get("/users", authHandler.HandleGetUser)
	r.Post("/login", authHandler.HandleLogin)

	// Serve static files
	workDir, _ := os.Getwd()
	filesDir := http.Dir(filepath.Join(workDir, "assets"))
	api.FileServer(r, "/static/", filesDir)

	fmt.Printf("Server running on port %s\n", *port)
	http.ListenAndServe(*port, r)
}
