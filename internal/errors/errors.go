package iErrors

import (
	"errors"
	"fmt"
	"net/http"
	"os"
	"runtime"
	"strings"

	"github.com/jackc/pgx/v5/pgconn"
)

const (
	HttpUnhandledError = iota
	HttpHandledError
)

func ValidatePgxError(err error, code string) (ok bool) {
	var pgErr *pgconn.PgError
	if errors.As(err, &pgErr) {
		if pgErr.Code == code {
			ok = true
		}
	}
	return ok
}

type ApiError struct {
	Title   string
	Status  int
	Msg     string
	Body    any
	err     error
	Trace   string
	Handled int
}

// Error returns the error message
func (e *ApiError) Error() string {
	return e.err.Error()
}

// SetHandled sets the ApiError as handled
//
// This means that the error has been handled and a generic error page wont be shown
// The error will still be logged, but the default handler will not render the error page
// When using this method, the error is expected to be handled on the handler function
func (e *ApiError) SetHandled() *ApiError {
	e.Handled = HttpHandledError
	return e
}

// WithBody sets the body of the ApiError
//
// This body will be logged
// Body: any object that can be used to provide more information about the error
func (e *ApiError) WithBody(body any) *ApiError {
	e.Body = body
	return e
}

// WithMsg sets an error message to the ApiError
//
// This msg will be used to display an error message to the user
// msg: the message to be displayed
func (e *ApiError) WithMsg(msg string) *ApiError {
	e.Msg = msg
	return e
}

// NewApiErr creates a new unhandled ApiError with the given status
//
// title: Any title or broad description of the error
// status: the http status code
// err: the error object
func NewApiErr(title string, status int, err error) *ApiError {
	return &ApiError{
		Title:   title,
		Status:  status,
		Msg:     err.Error(),
		err:     err,
		Trace:   getTrace(),
		Handled: HttpUnhandledError,
	}
}

// NewServerError creates a new unhandled ApiError with status 500
//
// title: Any title or broad description of the error
// err: the error object
func NewServerError(title string, err error) *ApiError {
	return &ApiError{
		Title:   title,
		Status:  http.StatusInternalServerError,
		Msg:     err.Error(),
		err:     err,
		Trace:   getTrace(),
		Handled: HttpUnhandledError,
	}
}

// NewBrError creates a new unhandled ApiError with status 400
//
// title: Any title or broad description of the error
// err: the error object
func NewBrError(title string, err error) *ApiError {
	return &ApiError{
		Title:   title,
		Status:  http.StatusBadRequest,
		Msg:     err.Error(),
		err:     err,
		Trace:   getTrace(),
		Handled: HttpUnhandledError, // este no sería necesario ya que el valor por defect de int es 0
	}
}

// getTrace returns the function name, file name and line number of the caller
func getTrace() string {
	wd, _ := os.Getwd()
	pc, filename, line, _ := runtime.Caller(2)
	function := runtime.FuncForPC(pc).Name()
	if file, ok := strings.CutPrefix(filename, wd); ok {
		filename = file
	}
	file := strings.Split(filename, "/")
	filename = file[len(file)-1]
	fn := strings.Split(function, ".")
	function = fn[len(fn)-1]
	return fmt.Sprintf("%s[%s:%d]", function, filename, line)
}
