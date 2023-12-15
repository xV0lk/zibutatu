package views

import "github.com/labstack/echo/v4"

type HttpError struct {
	Code        int
	Msg         string
	Description string
}

type RenderError struct {
	Err bool
	Msg string
}

type ToastBody struct {
	Msg  string
	Type string
}

func Toast(body ToastBody, oob bool, c echo.Context, status int) error {
	if oob {
		ToastEl(body, oob).Render(c.Request().Context(), c.Response().Writer)
		c.Response().Writer.WriteHeader(status)
		return nil
	} else {
		c.Response().Writer.WriteHeader(status)
		return ToastEl(body, oob).Render(c.Request().Context(), c.Response().Writer)
	}

}
