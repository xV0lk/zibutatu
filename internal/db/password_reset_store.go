package db

import (
	"context"
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"strings"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/xV0lk/htmx-go/types"
)

type PasswordResetStore interface {
	Create(email string, ctx context.Context) (*types.PasswordReset, error)
	Consume(token string, ctx context.Context) (*types.User, error)
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

func (s *PsPwResetStore) Create(email string, ctx context.Context) (*types.PasswordReset, error) {
	email = strings.ToLower(email)
	var userId int
	row := s.db.QueryRow(ctx, "SELECT id FROM users WHERE email = $1", email)
	err := row.Scan(&userId)
	if err != nil {
		return nil, err
	}

	token, err := types.PassResetToken()
	if err != nil {
		return nil, err
	}

	pwt := types.NewPasswordToken(userId, token)
	if err := s.insert(pwt); err != nil {
		return nil, err
	}
	return pwt, nil
}

func (s *PsPwResetStore) Consume(token string, ctx context.Context) (*types.User, error) {
	tkh := s.hash(token)
	var user types.User
	var pwReset types.PasswordReset
	query := `SELECT password_reset.id,
				password_reset.expires_at,
				users.id,
				users.email
				FROM password_reset
				JOIN users ON users.id = password_reset.user_id
				WHERE password_reset.token_hash = $1;`
	row := s.db.QueryRow(ctx, query, tkh)
	err := row.Scan(&pwReset.ID, &pwReset.ExpiresAt, &user.ID, &user.Email)
	if err != nil {
		return nil, fmt.Errorf("Consume pw token: %w", err)
	}
	if time.Now().After(pwReset.ExpiresAt) {
		return nil, fmt.Errorf("Token Expired")
	}
	err = s.delete(pwReset.ID)
	if err != nil {
		return nil, fmt.Errorf("Consume pw token: %w", err)
	}
	return &user, nil
}

func (s *PsPwResetStore) insert(token *types.PasswordReset) error {
	query := ` INSERT INTO
				password_reset (user_id, token_hash, expires_at)
				VALUES ($1, $2, $3) ON CONFLICT (user_id) DO
				UPDATE
				SET token_hash = $2, expires_at = $3
				RETURNING id;`
	row := s.db.QueryRow(context.Background(), query, token.UserID, token.TokenHash, token.ExpiresAt)
	err := row.Scan(&token.ID)
	if err != nil {
		return err
	}
	return nil
}

func (s *PsPwResetStore) hash(token string) string {
	h := sha256.Sum256([]byte(token))
	return base64.URLEncoding.EncodeToString(h[:])
}

func (s *PsPwResetStore) delete(id int) error {
	query := `DELETE FROM password_reset WHERE id = $1;`
	_, err := s.db.Exec(context.Background(), query, id)
	if err != nil {
		return err
	}
	return nil
}
