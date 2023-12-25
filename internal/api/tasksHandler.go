package api

import (
	"context"
	"fmt"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/gorilla/schema"
	"github.com/xV0lk/htmx-go/internal/ctx"
	"github.com/xV0lk/htmx-go/internal/db"
	"github.com/xV0lk/htmx-go/internal/middleware"
	_ "github.com/xV0lk/htmx-go/internal/translations"
	"github.com/xV0lk/htmx-go/types"
	"github.com/xV0lk/htmx-go/views"
	tViews "github.com/xV0lk/htmx-go/views/tasks"
)

type TasksHandler struct {
	TaskStore db.TaskStore
}

// NewTasksHandler creates a new TasksHandler instance.
//
// It takes a TaskStore as a parameter and returns a pointer to a TasksHandler.
func NewTasksHandler(store db.TaskStore) *TasksHandler {
	return &TasksHandler{
		TaskStore: store,
	}
}

// HandleGetTasks handles the GET /tasks endpoint.
//
// It fetches tasks from the task store and returns the tasks along with their count and completed count.
//
// ctx - the echo context for handling the HTTP request and response.
//
// Returns an error if there was a problem fetching the tasks or rendering the response.
func (h *TasksHandler) HandleGetTasks(w http.ResponseWriter, r *http.Request) {
	l := ctx.Value[middleware.Localizer](r.Context())

	tData, err := h.getCount()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	counter := tViews.Tasks(tData, false, l)
	counter.Render(r.Context(), w)
	return
}

// HandlePostTask handles the POST request for creating a new task.
//
// It takes in the echo.Context object as a parameter.
// Adds a task to the database and displays a response message.
// It returns an error if there was an issue handling the request.
func (h *TasksHandler) HandlePostTask(w http.ResponseWriter, r *http.Request) {
	c := r.Context()
	l := ctx.Value[middleware.Localizer](c)
	decoder := ctx.Value[schema.Decoder](c)
	if err := r.ParseForm(); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var taskBody types.TaskBody
	// bind the request form data fv to the taskBody struct without using echo ctx
	// try to bind it like echo ctx.Bind but using go standard library remember the data is coming as form data not json

	// Initialize the toast options
	tBody := views.ToastBody{
		Msg:  l.Translate("Tarea Agregada exitosamente."),
		Type: "success",
	}

	// Bind the request body
	if err := decoder.Decode(&taskBody, r.Form); err != nil {
		tBody.Msg = err.Error()
		tBody.Type = "error"
		views.Toast(tBody, true, c, w, http.StatusBadRequest)
		tViews.Form(l).Render(c, w)
		return
	}

	// Validate the request
	if taskBody.Title == "" {
		tBody.Msg = l.Translate("Nombre no puede estar vacío")
		tBody.Type = "warning"
		views.Toast(tBody, true, c, w, http.StatusBadRequest)
		tViews.Form(l).Render(c, w)
		return
	}

	// Insert the task to the store
	_, err := h.TaskStore.InsertTask(taskBody.Title)
	if err != nil {
		tBody.Msg = err.Error()
		tBody.Type = "error"
		views.Toast(tBody, true, c, w, http.StatusInternalServerError)
		tViews.Form(l).Render(c, w)
		return
	}

	// This update the tasks list and the counters
	if err = updateTasksView(h, c, w); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	// This update only the form and response message

	views.Toast(tBody, true, c, w, http.StatusCreated)
	tViews.Form(l).Render(c, w)
	return
}

// HandleDeleteTask handles the deletion of a task.
// It takes the echo.Context as a parameter and returns an error.
//
// This will delete the task and update the tasks view.
// If there is an error during the deletion or update, it returns an error.
func (h *TasksHandler) HandleDeleteTask(w http.ResponseWriter, r *http.Request) {
	c := r.Context()
	l := ctx.Value[middleware.Localizer](c)

	// Get id from url
	tId := chi.URLParam(r, "id")
	id, err := strconv.Atoi(tId)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(l.Translate("Id no valido")))
		return
	}

	// Delete task
	if err = h.TaskStore.DeleteTask(c, id); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	// This update the tasks list
	if err = updateTasksView(h, c, w); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}
	return
}

// HandleToogleTask toggles the status of a task based on the provided ID.
//
// Parameters:
// - ctx: the echo context.
//
// Returns:
// - An error.
func (h *TasksHandler) HandleToogleTask(w http.ResponseWriter, r *http.Request) {
	c := r.Context()
	l := ctx.Value[middleware.Localizer](c)
	decoder := ctx.Value[schema.Decoder](c)

	if err := r.ParseForm(); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var (
		taskStatus types.TaskStatus
		completed  bool
	)

	// Get id from url
	tId := chi.URLParam(r, "id")
	id, err := strconv.Atoi(tId)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(l.Translate("Id no valido")))
		return
	}

	// Bind the request body
	if err := decoder.Decode(&taskStatus, r.Form); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	switch taskStatus.Completed {
	case "":
		completed = false
	case "on":
		completed = true
	default:
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(l.Translate("Status no valido")))
		return
	}

	_, err = h.TaskStore.UpdateTaskCompleted(id, completed)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	if err = updateTasksView(h, c, w); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}
	return
}

// HandleEditTask handles the request to edit a task.
// It retrieves the task ID from the URL, fetches the task from the task store,
// and renders the task view with the provided context and response writer.
// If any error occurs during the process, it returns the corresponding HTTP status code and error message.
func (h *TasksHandler) HandleEditTask(w http.ResponseWriter, r *http.Request) {
	l := ctx.Value[middleware.Localizer](r.Context())

	// Get id from url
	tId := chi.URLParam(r, "id")
	id, err := strconv.Atoi(tId)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(l.Translate("Id no valido")))
		return
	}

	println("id: ", id)

	item, err := h.TaskStore.FetchTask(id)
	println("id: ", id)
	fmt.Printf("-------------------------\nitem: %+v\n", item)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	task := tViews.Task(item, true)
	task.Render(r.Context(), w)
	return
}

// HandlePutTask handles the PUT request for updating a task.
// It parses the request context, validates the task ID, and updates the task title.
// If successful, it returns a success toast message.
// If there are any errors, it returns an error toast message.
func (h *TasksHandler) HandlePutTask(w http.ResponseWriter, r *http.Request) {
	c := r.Context()
	l := ctx.Value[middleware.Localizer](c)
	decoder := ctx.Value[schema.Decoder](c)
	if err := r.ParseForm(); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var taskBody types.TaskBody
	tBody := views.ToastBody{
		Msg:  l.Translate("Tarea actualizada exitosamente."),
		Type: "success",
	}

	tId := chi.URLParam(r, "id")
	id, err := strconv.Atoi(tId)

	if err != nil {
		tBody.Msg = l.Translate("Id no valido")
		tBody.Type = "error"
		views.Toast(tBody, false, c, w, http.StatusBadRequest)
		return
	}

	// Bind the request body
	if err := decoder.Decode(&taskBody, r.Form); err != nil {
		tBody.Msg = err.Error()
		tBody.Type = "error"
		views.Toast(tBody, true, c, w, http.StatusBadRequest)
		return
	}

	if taskBody.Title == "" {
		tBody.Msg = l.Translate("Nombre no puede estar vacío")
		tBody.Type = "warning"
		views.Toast(tBody, false, c, w, http.StatusBadRequest)
		return
	}

	println("taskBody.Title: ", taskBody.Title)

	item, err := h.TaskStore.UpdateTaskTitle(id, taskBody.Title)
	if err != nil {
		tBody.Msg = err.Error()
		tBody.Type = "error"
		views.Toast(tBody, false, c, w, http.StatusInternalServerError)
		return
	}
	task := tViews.Task(item, false)
	views.Toast(tBody, true, c, w, http.StatusOK)
	task.Render(c, w)
	return
}

// getCount retrieves the count of tasks and completed tasks from the TaskStore.
//
// It takes a TasksHandler pointer as a parameter and returns a Tasks object and an error.
func (h *TasksHandler) getCount() (data types.Tasks, err error) {
	items, err := h.TaskStore.FetchTasks()
	if err != nil {
		return
	}
	tTasks, err := h.TaskStore.FetchCount()
	if err != nil {
		return
	}
	tCompletedTasks, err := h.TaskStore.FetchCompletedCount()
	if err != nil {
		return
	}

	data = types.Tasks{
		Items:          items,
		Count:          tTasks,
		CompletedCount: tCompletedTasks,
	}
	return
}

// updateTasksView updates the tasks view.
//
// This function takes a TasksHandler pointer and an echo.Context as parameters.
// It retrieves the count data using the getCount method of the TasksHandler.
// Then, it updates the counter and tasks component data by rendering them using the Counter and TaskList views respectively.
func updateTasksView(h *TasksHandler, c context.Context, w http.ResponseWriter) error {
	l := ctx.Value[middleware.Localizer](c)

	data, err := h.getCount()
	if err != nil {
		return err
	}
	// This updates the counter and tasks component data because of the hx-swap-oob attribute
	counter := tViews.Counter(data, true, l)
	counter.Render(c, w)
	tasks := tViews.TaskList(data, true)
	tasks.Render(c, w)
	return nil
}
