package api

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/xV0lk/htmx-go/db"
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
func (h *TasksHandler) HandleGetTasks(ctx echo.Context) error {
	tData, err := h.getCount()
	if err != nil {
		return err
	}
	counter := tViews.Tasks(tData, false)
	return counter.Render(ctx.Request().Context(), ctx.Response().Writer)
}

// HandlePostTask handles the POST request for creating a new task.
//
// It takes in the echo.Context object as a parameter.
// Adds a task to the database and displays a response message.
// It returns an error if there was an issue handling the request.
func (h *TasksHandler) HandlePostTask(ctx echo.Context) error {
	var taskBody types.TaskBody
	tBody := views.ToastBody{
		Msg:  "Tarea Agregada exitosamente.",
		Type: "success",
	}

	if err := ctx.Bind(&taskBody); err != nil {
		tBody.Msg = err.Error()
		tBody.Type = "error"
		views.Toast(tBody, true, ctx, http.StatusBadRequest)
		return tViews.Form().Render(ctx.Request().Context(), ctx.Response().Writer)
	}

	if taskBody.Title == "" {
		tBody.Msg = "Nombre no puede estar vacío."
		tBody.Type = "warning"
		views.Toast(tBody, true, ctx, http.StatusBadRequest)
		return tViews.Form().Render(ctx.Request().Context(), ctx.Response().Writer)
	}

	_, err := h.TaskStore.InsertTask(taskBody.Title)
	if err != nil {
		tBody.Msg = err.Error()
		tBody.Type = "error"
		views.Toast(tBody, true, ctx, http.StatusInternalServerError)
		return tViews.Form().Render(ctx.Request().Context(), ctx.Response().Writer)
	}

	// This update the tasks list and the counters
	if err = updateTasksView(h, ctx); err != nil {
		return ctx.String(http.StatusInternalServerError, err.Error())
	}
	// This update only the form and response message

	views.Toast(tBody, true, ctx, http.StatusCreated)
	return tViews.Form().Render(ctx.Request().Context(), ctx.Response().Writer)
}

func (h *TasksHandler) HandleDeleteTask(ctx echo.Context) error {
	tId := ctx.Param("id")
	id, err := strconv.Atoi(tId)
	if err != nil {
		return ctx.String(http.StatusBadRequest, "Id no valido")
	}
	if err = h.TaskStore.DeleteTask(ctx.Request().Context(), id); err != nil {
		return ctx.String(http.StatusInternalServerError, err.Error())
	}

	if err = updateTasksView(h, ctx); err != nil {
		return ctx.String(http.StatusInternalServerError, err.Error())
	}
	return nil
}

// HandleToogleTask toggles the status of a task based on the provided ID.
//
// Parameters:
// - ctx: the echo context.
//
// Returns:
// - An error.
func (h *TasksHandler) HandleToogleTask(ctx echo.Context) error {
	var (
		taskStatus types.TaskStatus
		completed  bool
	)

	tId := ctx.Param("id")
	id, err := strconv.Atoi(tId)

	if err != nil {
		return ctx.String(http.StatusBadRequest, "Id no valido")
	}

	ctx.Bind(&taskStatus)

	switch taskStatus.Completed {
	case "":
		completed = false
	case "on":
		completed = true
	default:
		return ctx.String(http.StatusBadRequest, "Status no valido")
	}

	_, err = h.TaskStore.UpdateTaskCompleted(id, completed)
	if err != nil {
		return ctx.String(http.StatusInternalServerError, err.Error())
	}

	if err = updateTasksView(h, ctx); err != nil {
		return ctx.String(http.StatusInternalServerError, err.Error())
	}
	return nil
}

func (h *TasksHandler) HandleEditTask(ctx echo.Context) error {
	tId := ctx.Param("id")
	id, err := strconv.Atoi(tId)

	if err != nil {
		return ctx.String(http.StatusBadRequest, "Id no valido")
	}

	item, err := h.TaskStore.FetchTask(id)

	if err != nil {
		return ctx.String(http.StatusInternalServerError, err.Error())
	}

	task := tViews.Task(item, true)
	task.Render(ctx.Request().Context(), ctx.Response().Writer)
	return nil
}

func (h *TasksHandler) HandlePutTask(ctx echo.Context) error {
	var taskBody types.TaskBody
	tBody := views.ToastBody{
		Msg:  "Tarea actualizada exitosamente.",
		Type: "success",
	}

	tId := ctx.Param("id")
	id, err := strconv.Atoi(tId)

	if err != nil {
		tBody.Msg = "Id no valido."
		tBody.Type = "error"
		return views.Toast(tBody, false, ctx, http.StatusBadRequest)
	}

	if err := ctx.Bind(&taskBody); err != nil {
		tBody.Msg = err.Error()
		tBody.Type = "error"
		return views.Toast(tBody, false, ctx, http.StatusBadRequest)
	}

	if taskBody.Title == "" {
		tBody.Msg = "Nombre no puede estar vacío."
		tBody.Type = "warning"
		return views.Toast(tBody, false, ctx, http.StatusBadRequest)
	}

	item, err := h.TaskStore.UpdateTaskTitle(id, taskBody.Title)
	if err != nil {
		tBody.Msg = err.Error()
		tBody.Type = "error"
		return views.Toast(tBody, false, ctx, http.StatusInternalServerError)
	}
	task := tViews.Task(item, false)
	views.Toast(tBody, true, ctx, http.StatusOK)
	return task.Render(ctx.Request().Context(), ctx.Response().Writer)
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
func updateTasksView(h *TasksHandler, c echo.Context) error {
	data, err := h.getCount()
	if err != nil {
		return err
	}
	// This updates the counter and tasks component data because of the hx-swap-oob attribute
	counter := tViews.Counter(data, true)
	counter.Render(c.Request().Context(), c.Response().Writer)
	tasks := tViews.TaskList(data, true)
	tasks.Render(c.Request().Context(), c.Response().Writer)
	return nil
}
