package db

import (
	"context"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/xV0lk/htmx-go/types"
)

type Closer interface {
	Close()
}

type AuthStore interface {
	AddUser(*types.User, context.Context) error
	FetchUser(int, context.Context) (*types.User, error)
	GetUserAuth(string, context.Context) (*types.UserPass, error)

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
func (s *PsAuthStore) GetUserAuth(email string, ctx context.Context) (*types.UserPass, error) {
	query := "SELECT id, first_name, last_name, email, studio_id, is_admin, created_at, updated_at, language, password FROM users WHERE email = $1;"

	user := &types.UserPass{}

	rows, err := s.db.Query(ctx, query, email)
	if err != nil {
		return user, err
	}
	user, err = pgx.CollectExactlyOneRow(rows, pgx.RowToAddrOfStructByNameLax[types.UserPass])
	if err != nil {
		return user, err
	}

	return user, nil
}
