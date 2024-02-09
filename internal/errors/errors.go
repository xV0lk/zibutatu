package iErrors

import (
	"errors"

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
