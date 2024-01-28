package views

import (
	"context"
	"net/http"
)

type HttpError struct {
	Code        int
	Msg         string
	Description string
}

type RenderError struct {
	Err bool
	Msg string
}

type ToastType string

type ToastBody struct {
	Msg  string
	Type ToastType
}

const (
	ToastSuccess ToastType = "success"
	ToastError   ToastType = "error"
	ToastWarning ToastType = "warning"
)

func Toast(body ToastBody, oob bool, c context.Context, w http.ResponseWriter, status int) error {
	if oob {
		ToastEl(body, oob).Render(c, w)
		w.WriteHeader(status)
		return nil
	} else {
		w.WriteHeader(status)
		return ToastEl(body, oob).Render(c, w)
	}

}
