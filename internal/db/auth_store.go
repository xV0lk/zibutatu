package db

import (
	"context"
	"fmt"
	"strings"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	mw "github.com/xV0lk/htmx-go/internal/middleware"
	"github.com/xV0lk/htmx-go/types"
)

type UserStore struct {
	Auth    AuthStore
	Session SessionStore
}

func NewUserStore(auth AuthStore, session SessionStore) *UserStore {
	return &UserStore{
		auth,
		session,
	}
}

type Closer interface {
	Close()
}

type AuthStore interface {
	AddUser(*types.User, context.Context) error
	FetchUser(int, context.Context) (*types.User, error)
	AuthenticateUser(*types.AuthParams, context.Context) (*types.User, error)

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

func (s *PsAuthStore) AddUser(user *types.User, ctx context.Context) error {
	query := `INSERT INTO users 
	(first_name, last_name, email, studio_id, is_admin, created_at, updated_at, language, password) 
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`

	_, err := s.db.Exec(ctx, query, user.FirstName, user.LastName, user.Email, user.StudioID, user.IsAdmin, user.CreatedAt, user.UpdatedAt, user.Language, user.Password)

	if err != nil {
		return err
	}

	return nil
}

func (s *PsAuthStore) FetchUser(id int, ctx context.Context) (*types.User, error) {
	query := "SELECT id, first_name, last_name, email, studio_id, is_admin, created_at, updated_at, language FROM users WHERE id = $1;"

	user := &types.User{}

	rows, err := s.db.Query(ctx, query, id)
	if err != nil {
		return user, err
	}
	user, err = pgx.CollectExactlyOneRow(rows, pgx.RowToAddrOfStructByNameLax[types.User])
	if err != nil {
		return user, err
	}

	return user, nil
}
func (s *PsAuthStore) AuthenticateUser(auth *types.AuthParams, ctx context.Context) (*types.User, error) {
	em := strings.ToLower(auth.Email)

	query := "SELECT id, first_name, last_name, email, studio_id, is_admin, created_at, updated_at, language, password FROM users WHERE email = $1;"

	user := &types.User{}

	rows, err := s.db.Query(ctx, query, em)
	if err != nil {
		return user, fmt.Errorf(mw.Translate(ctx, "Ocurrió un error"))
	}

	user, err = pgx.CollectExactlyOneRow(rows, pgx.RowToAddrOfStructByNameLax[types.User])
	if err != nil {
		fmt.Printf("-------------------------\nerr 1: %s\n", err)
		return user, fmt.Errorf(mw.Translate(ctx, "Usuario no encontrado"))
	}

	if !types.IsValidPassword(user.Password, auth.Password) {
		return user, fmt.Errorf(mw.Translate(ctx, "Contraseña incorrecta"))
	}
	// Clear password so we don't return it to the client
	user.Password = ""

	return user, nil
}
