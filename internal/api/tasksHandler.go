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
	mw "github.com/xV0lk/htmx-go/internal/middleware"
	"github.com/xV0lk/htmx-go/types"
	"github.com/xV0lk/htmx-go/views"
	tViews "github.com/xV0lk/htmx-go/views/tasks"
)

type TasksHandler struct {
	TaskStore db.TaskStore
	decoder   *schema.Decoder
}

// NewTasksHandler creates a new TasksHandler instance.
//
// It takes a TaskStore as a parameter and returns a pointer to a TasksHandler.
func NewTasksHandler(store db.TaskStore, decoder *schema.Decoder) *TasksHandler {
	return &TasksHandler{
		TaskStore: store,
		decoder:   decoder,
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
	user := ctx.Value[types.User](r.Context())
	if user == nil {
		fmt.Println("No session error, redirecting to login: ")
		http.Redirect(w, r, "/login", http.StatusFound)
		return
	}
	tData, err := h.getCount(user.ID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	counter := tViews.Tasks(tData, false)
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
	user := ctx.Value[types.User](r.Context())

	var taskBody types.TaskBody

	// Initialize the toast options
	tBody := views.ToastBody{
		Msg:  mw.Translate(c, "Tarea Agregada exitosamente."),
		Type: views.ToastSuccess,
	}

	// Bind the request body
	taskBody.Title = r.FormValue("title")
	taskBody.UserId = user.ID

	// Validate the request
	if taskBody.Title == "" {
		tBody.Msg = mw.Translate(c, "Nombre no puede estar vacío")
		tBody.Type = views.ToastWarning
		views.Toast(tBody, true, c, w, http.StatusBadRequest)
		tViews.Form().Render(c, w)
		return
	}

	// Insert the task to the store
	_, err := h.TaskStore.InsertTask(taskBody)
	if err != nil {
		tBody.Msg = err.Error()
		tBody.Type = views.ToastError
		views.Toast(tBody, true, c, w, http.StatusInternalServerError)
		tViews.Form().Render(c, w)
		return
	}

	// This update the tasks list and the counters
	if err = updateTasksView(h, c, w); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	// This update only the form and response message

	views.Toast(tBody, true, c, w, http.StatusCreated)
	tViews.Form().Render(c, w)
	return
}

// HandleDeleteTask handles the deletion of a task.
// It takes the echo.Context as a parameter and returns an error.
//
// This will delete the task and update the tasks view.
// If there is an error during the deletion or update, it returns an error.
func (h *TasksHandler) HandleDeleteTask(w http.ResponseWriter, r *http.Request) {
	c := r.Context()

	// Get id from url
	tId := chi.URLParam(r, "id")
	id, err := strconv.Atoi(tId)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(mw.Translate(c, "Id no valido")))
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

	var (
		taskStatus types.TaskStatus
		completed  bool
	)

	// Get id from url
	tId := chi.URLParam(r, "id")
	id, err := strconv.Atoi(tId)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(mw.Translate(c, "Id no valido")))
		return
	}

	// Bind the request body
	taskStatus.Completed = r.FormValue("completed")

	switch taskStatus.Completed {
	case "":
		completed = false
	case "on":
		completed = true
	default:
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(mw.Translate(c, "Status no valido")))
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
	// Get id from url
	tId := chi.URLParam(r, "id")
	id, err := strconv.Atoi(tId)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(mw.Translate(r.Context(), "Id no valido")))
		return
	}

	item, err := h.TaskStore.FetchTask(id)

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

	var taskBody types.TaskBody
	tBody := views.ToastBody{
		Msg:  mw.Translate(c, "Tarea actualizada exitosamente."),
		Type: views.ToastSuccess,
	}

	tId := chi.URLParam(r, "id")
	id, err := strconv.Atoi(tId)

	if err != nil {
		tBody.Msg = mw.Translate(c, "Id no valido")
		tBody.Type = views.ToastError
		views.Toast(tBody, false, c, w, http.StatusBadRequest)
		return
	}

	// Bind the request body
	taskBody.Title = r.FormValue("title")

	if taskBody.Title == "" {
		tBody.Msg = mw.Translate(c, "Nombre no puede estar vacío")
		tBody.Type = views.ToastWarning
		views.Toast(tBody, false, c, w, http.StatusBadRequest)
		return
	}

	item, err := h.TaskStore.UpdateTaskTitle(id, taskBody.Title)
	if err != nil {
		tBody.Msg = err.Error()
		tBody.Type = views.ToastError
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
func (h *TasksHandler) getCount(uId int) (data types.Tasks, err error) {
	items, err := h.TaskStore.FetchTasks(uId)
	if err != nil {
		return
	}
	tTasks, err := h.TaskStore.FetchCount(uId)
	if err != nil {
		return
	}
	tCompletedTasks, err := h.TaskStore.FetchCompletedCount(uId)
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
	user := ctx.Value[types.User](c)
	data, err := h.getCount(user.ID)
	if err != nil {
		return err
	}
	// This updates the counter and tasks component data because of the hx-swap-oob attribute
	counter := tViews.Counter(data, true)
	counter.Render(c, w)
	tasks := tViews.TaskList(data, true)
	tasks.Render(c, w)
	return nil
}
