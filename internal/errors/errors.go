package iErrors

import (
	"errors"
	"fmt"
	"os"
	"runtime"
	"strings"

	"github.com/jackc/pgerrcode"
	"github.com/jackc/pgx/v5/pgconn"
)

func ValidatePgxError(err error, code string) (ok bool) {
	var pgErr *pgconn.PgError
	if errors.As(err, &pgErr) {
		if pgErr.Code == pgerrcode.UniqueViolation {
			ok = true
		}
	}
	return ok
}

type PublicError interface {
	error
	Public() string
	Unwrap() error
}

func Public(err error, msg string) publicError {
	return publicError{err, msg}
}

type publicError struct {
	err error
	msg string
}

func (pe publicError) Error() string {
	return pe.err.Error()
}

func (pe publicError) Unwrap() error {
	return pe.err
}

func (pe publicError) Public() string {
	return pe.msg
}

func FromError(err error) publicError {
	var pe publicError
	if errors.As(err, &pe) {
		return pe
	}
	return publicError{err, err.Error()}
}

type ApiError struct {
	Title  string
	Status int
	Msg    string
	Body   any
	err    error
	Trace  string
}

func (e *ApiError) Error() string {
	return e.err.Error()
}

// func (e ApiError) Unwrap() error {
// 	return e.err
// }

func NewApiErr(title string, status int, msg string, body any, err error) *ApiError {
	return &ApiError{
		Title:  title,
		Status: status,
		Msg:    msg,
		Body:   body,
		err:    err,
		Trace:  getTrace(),
	}
}

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

// func (e *ApiError) Title() string {
// 	return e.title
// }
// func (e *ApiError) Msg() string {
// 	return e.msg
// }

// func (e *ApiError) Status() int {
// 	return e.status
// }

// func (e *ApiError) Body() any {
// 	return e.body
// }
