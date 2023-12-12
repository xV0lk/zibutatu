package api

import (
	"github.com/labstack/echo/v4"
	"github.com/xV0lk/htmx-go/db"
	"github.com/xV0lk/htmx-go/types"
	views "github.com/xV0lk/htmx-go/views/tasks"
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
	items, err := h.TaskStore.FetchTasks()
	if err != nil {
		return err
	}
	tTasks, err := h.TaskStore.FetchCount()
	if err != nil {
		return err
	}
	tCompletedTasks, err := h.TaskStore.FetchCompletedCount()
	if err != nil {
		return err
	}

	tData := types.Tasks{
		Items:          items,
		Count:          tTasks,
		CompletedCount: tCompletedTasks,
	}
	counter := views.Tasks(tData)
	return counter.Render(ctx.Request().Context(), ctx.Response().Writer)
}
