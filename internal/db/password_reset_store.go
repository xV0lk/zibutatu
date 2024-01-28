package db

import (
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/xV0lk/htmx-go/types"
)

type PasswordResetStore interface {
	Create(email string) (*types.PasswordReset, error)
	Consume(token string) (*types.User, error)
}

type PsPwResetStore struct {
	db *pgxpool.Pool
}

func NewPsPwResetStore(db *pgxpool.Pool) *PsPwResetStore {
	return &PsPwResetStore{
		db,
	}
}

func (s *PsPwResetStore) Close() {
	s.db.Close()
}

func (s *PsPwResetStore) Create(email string) (*types.PasswordReset, error) {
	return nil, fmt.Errorf("TODO: PasswordResetStore.Create not implemented")
}

func (s *PsPwResetStore) Consume(token string) (*types.User, error) {
	return nil, fmt.Errorf("TODO: PasswordResetStore.Consume not implemented")
}
