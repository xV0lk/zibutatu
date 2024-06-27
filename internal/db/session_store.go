package db

import (
	"context"
	"crypto/sha256"
	"encoding/base64"
	"fmt"

	"github.com/jackc/pgerrcode"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	iErrors "github.com/xV0lk/htmx-go/internal/errors"
	"github.com/xV0lk/htmx-go/models"
)

type SessionStore interface {
	Create(userID int) (*models.Session, error)
	User(token string) (*models.User, error)
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

func (s *PsSessionStore) Create(userID int) (*models.Session, error) {
	token, err := models.SessionToken()
	if err != nil {
		return nil, fmt.Errorf("Create session: %w", err)
	}
	session := &models.Session{
		UserID:    userID,
		Token:     token,
		TokenHash: s.hash(token),
	}
	err = s.insert(session)
	if err != nil {
		return session, fmt.Errorf("Create session: %w", err)
	}
	return session, nil
}

func (s *PsSessionStore) User(token string) (*models.User, error) {
	th := s.hash(token)
	var user models.User

	query := `SELECT
				users.id,
				users.first_name,
				users.last_name,
				users.email,
				users.artist_id,
				users.is_admin,
				users.created_at,
				users.updated_at,
				users.language,
				users.password,
				users.is_active
			FROM sessions
				JOIN users ON sessions.user_id = users.id
			WHERE token_hash = $1;`
	rows, err := s.db.Query(context.Background(), query, th)

	if err != nil {
		return nil, fmt.Errorf("User from session: %w", err)
	}

	user, err = pgx.CollectExactlyOneRow(rows, pgx.RowToStructByName[models.User])
	if err != nil {
		if ok := iErrors.ValidatePgxError(err, pgerrcode.NoDataFound); ok {
			return nil, fmt.Errorf("User from session: %w", ErrorNotFound)
		}
		return nil, fmt.Errorf("User from session: %w", err)
	}
	user.Password = ""
	return &user, nil
}

func (s *PsSessionStore) Delete(token string) error {
	th := s.hash(token)
	query := "DELETE FROM sessions WHERE token_hash = $1;"
	_, err := s.db.Exec(context.Background(), query, th)
	if err != nil {
		return fmt.Errorf("Delete session: %w", err)
	}
	return nil
}

func (s *PsSessionStore) insert(session *models.Session) error {
	query := ` INSERT INTO
				sessions (user_id, token_hash)
				VALUES ($1, $2) ON CONFLICT (user_id) DO
				UPDATE
				SET token_hash = $2
				RETURNING id;`
	row := s.db.QueryRow(context.Background(), query, session.UserID, session.TokenHash)
	err := row.Scan(&session.ID)
	if err != nil {
		return fmt.Errorf("insert session: %w", err)
	}
	return nil
}

func (s *PsSessionStore) hash(token string) string {
	h := sha256.Sum256([]byte(token))
	return base64.URLEncoding.EncodeToString(h[:])
}
