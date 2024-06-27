package db

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"github.com/jackc/pgerrcode"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	iErrors "github.com/xV0lk/htmx-go/internal/errors"
	"github.com/xV0lk/htmx-go/models"
)

var (
	ErrEmailTaken      = errors.New("auth_store: email is already taken")
	ErrorNotFound      = errors.New("auth_store: user not found")
	ErrInvalidPassword = errors.New("auth_store: invalid password")
)

type UserStore struct {
	Auth    AuthStore
	Session SessionStore
	PwReset PasswordResetStore
}

func NewUserStore(auth AuthStore, session SessionStore, pwReset PasswordResetStore) *UserStore {
	return &UserStore{
		auth,
		session,
		pwReset,
	}
}

type Closer interface {
	Close()
}

type AuthStore interface {
	AddUser(*models.User, context.Context) error
	FetchUser(int, context.Context) (*models.User, error)
	AuthenticateUser(*models.AuthParams, context.Context) (*models.User, error)
	UpdatePassword(id int, password string, ctx context.Context) error

	Closer
}

type PsAuthStore struct {
	db *pgxpool.Pool
}

func NewPsAuthStore(db *pgxpool.Pool) *PsAuthStore {
	return &PsAuthStore{
		db,
	}
}

func (s *PsAuthStore) Close() {
	s.db.Close()
}

func (s *PsAuthStore) AddUser(user *models.User, ctx context.Context) error {
	query := `INSERT INTO users 
	(first_name, last_name, email, artist_id, is_admin, created_at, updated_at, language, password) 
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`

	_, err := s.db.Exec(ctx, query, user.FirstName, user.LastName, user.Email, user.ArtistID, user.IsAdmin, user.CreatedAt, user.UpdatedAt, user.Language, user.Password)

	if err != nil {
		if ok := iErrors.ValidatePgxError(err, pgerrcode.UniqueViolation); ok {
			return fmt.Errorf("AddUser: %w", ErrEmailTaken)
		}
		return fmt.Errorf("AddUser: %w", err)
	}

	return nil
}

func (s *PsAuthStore) FetchUser(id int, ctx context.Context) (*models.User, error) {
	query := "SELECT id, first_name, last_name, email, artist_id, is_admin, created_at, updated_at, language FROM users WHERE id = $1;"

	user := &models.User{}

	rows, err := s.db.Query(ctx, query, id)
	if err != nil {
		return user, err
	}
	user, err = pgx.CollectExactlyOneRow(rows, pgx.RowToAddrOfStructByNameLax[models.User])
	if err != nil {
		if ok := iErrors.ValidatePgxError(err, pgerrcode.NoDataFound); ok {
			return user, fmt.Errorf("FetchUser: %w", ErrorNotFound)
		}
		return user, fmt.Errorf("FetchUser: %w", err)
	}

	return user, nil
}
func (s *PsAuthStore) AuthenticateUser(auth *models.AuthParams, ctx context.Context) (*models.User, error) {
	em := strings.ToLower(auth.Email)

	query := "SELECT id, first_name, last_name, email, artist_id, is_admin, created_at, updated_at, language, password FROM users WHERE email = $1;"

	user := &models.User{}

	rows, err := s.db.Query(ctx, query, em)
	if err != nil {
		return user, fmt.Errorf("auth: %w", err)
	}

	user, err = pgx.CollectExactlyOneRow(rows, pgx.RowToAddrOfStructByNameLax[models.User])
	if err != nil {
		if ok := iErrors.ValidatePgxError(err, pgerrcode.NoDataFound); ok {
			return user, fmt.Errorf("auth: %w", ErrorNotFound)
		}
		return user, fmt.Errorf("auth: %w", err)
	}

	return user, nil
}

func (s *PsAuthStore) UpdatePassword(id int, password string, ctx context.Context) error {
	query := "UPDATE users SET password = $1 WHERE id = $2;"

	_, err := s.db.Exec(ctx, query, password, id)
	if err != nil {
		return fmt.Errorf("UpdatePassword: %w", err)
	}

	return nil
}
