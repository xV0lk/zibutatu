package db

import (
	"context"
	"crypto/sha256"
	"encoding/base64"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/xV0lk/htmx-go/types"
)

type SessionStore interface {
	Create(userID int) (*types.Session, error)
	User(token string) (*types.User, error)
	Delete(token string) error
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
	token, err := types.SessionToken()
	if err != nil {
		return nil, err
	}
	session := &types.Session{
		UserID:    userID,
		Token:     token,
		TokenHash: s.hash(token),
	}
	err = s.update(session)
	if err == pgx.ErrNoRows {
		err = s.insert(session)
	}
	if err != nil {
		return session, err
	}
	return session, nil
}

func (s *PsSessionStore) User(token string) (*types.User, error) {
	th := s.hash(token)
	var user types.User

	query := "SELECT user_id FROM sessions WHERE token_hash = $1;"
	row := s.db.QueryRow(context.Background(), query, th)
	err := row.Scan(&user.ID)

	if err != nil {
		return nil, err
	}

	query = "SELECT id, first_name, last_name, email, studio_id, is_admin, created_at, updated_at, language, password FROM users WHERE id = $1;"
	rows, err := s.db.Query(context.Background(), query, user.ID)

	if err != nil {
		return nil, err
	}

	user, err = pgx.CollectExactlyOneRow(rows, pgx.RowToStructByName[types.User])
	if err != nil {
		return nil, err
	}
	user.Password = ""
	return &user, nil
}

func (s *PsSessionStore) Delete(token string) error {
	th := s.hash(token)
	query := "DELETE FROM sessions WHERE token_hash = $1;"
	_, err := s.db.Exec(context.Background(), query, th)
	if err != nil {
		return err
	}
	return nil
}

func (s *PsSessionStore) insert(session *types.Session) error {
	query := `INSERT INTO sessions (user_id, token_hash) VALUES ($1, $2) RETURNING id`
	row := s.db.QueryRow(context.Background(), query, session.UserID, session.TokenHash)
	err := row.Scan(&session.ID)
	if err != nil {
		return err
	}
	return nil
}

// update
func (s *PsSessionStore) update(session *types.Session) error {
	query := `UPDATE sessions set token_hash = $2 WHERE user_id = $1 RETURNING id`
	row := s.db.QueryRow(context.Background(), query, session.UserID, session.TokenHash)
	err := row.Scan(&session.ID)
	if err != nil {
		return err
	}
	return nil
}

func (s *PsSessionStore) hash(token string) string {
	h := sha256.Sum256([]byte(token))
	return base64.URLEncoding.EncodeToString(h[:])
}
