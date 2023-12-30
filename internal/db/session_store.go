package db

import (
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/xV0lk/htmx-go/types"
)

type SessionStore interface {
	Create(userID int) (*types.Session, error)
	User(token string) (*types.User, error)
	Closer
}

type PsSessionStore struct {
	db *pgxpool.Pool
}

func NewPsSessionStore(db *pgxpool.Pool) *PsSessionStore {
	return &PsSessionStore{
		db,
	}
}

func (s *PsSessionStore) Close() {
	s.db.Close()
}

func (s *PsSessionStore) Create(userID int) (*types.Session, error) {
	// TODO: INSERT SESSION TOKEN
	return nil, nil
}

func (s *PsSessionStore) User(token string) (*types.User, error) {

	return nil, nil
}
