package main

import (
	"embed"
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
	"github.com/xV0lk/htmx-go/types"
)

//go:embed migrations/*.sql
var embedMigrations embed.FS

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

	if err := db.Migrate(psqlStore, embedMigrations); err != nil {
		log.Fatal(err)
	}

	cgf, _ := types.DefaultEmailConfig()
	_, err = types.NewEmailService(*cgf)
	if err != nil {
		fmt.Printf("-------------------------\nerr creating mail service: %s\n", err)
		log.Fatal(err)
		return
	}
	fmt.Println("Connected to mail Service")

	var (
		// Stores
		decoder      = schema.NewDecoder()
		authStore    = db.NewPsAuthStore(psqlStore)
		taskStore    = db.NewPsTaskStore(psqlStore)
		sessionStore = db.NewPsSessionStore(psqlStore)
		userStore    = db.NewUserStore(authStore, sessionStore)
		// handlers
		tasksHandler = api.NewTasksHandler(taskStore, decoder)
		authHandler  = api.NewAuthHandler(userStore, decoder)
		// Connection
		port = flag.String("port", ":1323", "port to run the server on")
		r    = chi.NewRouter()
	)
	r.Use(chiMiddleware.Logger)
	r.Use(middleware.I18n)
	r.Use(middleware.User(userStore))

	// main group of routes that use csrf and sessions
	r.Group(func(r chi.Router) {
		r.Use(middleware.Csrf)
		r.Get("/", authHandler.HandleRoot)
		r.Route("/login", func(r chi.Router) {
			r.Get("/", authHandler.HandleLogin)
			r.Post("/", authHandler.HandleAuthenticate)
			r.Delete("/", authHandler.HandleLogout)
		})
		r.Get("/home", authHandler.HandleHome)
		r.Route("/tasks", func(r chi.Router) {
			r.Get("/", tasksHandler.HandleGetTasks)
			r.Post("/", tasksHandler.HandlePostTask)
			r.Put("/{id}/toggle", tasksHandler.HandleToogleTask)
			r.Delete("/{id}", tasksHandler.HandleDeleteTask)
			r.Get("/{id}/edit", tasksHandler.HandleEditTask)
			r.Put("/{id}", tasksHandler.HandlePutTask)
		})
	})

	// This is a json route and is not intended to be used by the browser
	// TODO: Add middleware to protect this route so it can only be accessed by super admin
	// TODO: Add in the front so it can be used by the browser to work with csrf
	r.Route("/admin-internal", func(r chi.Router) {
		r.Get("/", authHandler.HandleGetUser)
		r.Post("/", authHandler.HandleNewUser)
	})

	// Serve static files
	workDir, _ := os.Getwd()
	filesDir := http.Dir(filepath.Join(workDir, "assets"))
	api.FileServer(r, "/static/", filesDir)

	fmt.Printf("Server running on port %s\n", *port)
	http.ListenAndServe(*port, r)
}
