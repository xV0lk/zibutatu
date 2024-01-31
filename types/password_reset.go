package types

import (
	"crypto/sha256"
	"encoding/base64"
	"time"
)

const (
	PassResetTokenBytes = 32
	ResetDuration       = 1 * time.Hour
)

type PasswordReset struct {
	ID        int       `db:"id,omitempty"`
	UserID    int       `db:"user_id,unique"`
	TokenHash string    `db:"token_hash,unique"`
	ExpiresAt time.Time `db:"expires_at"`
	// not to be stored in the database
	Token string
}

// Option is a functional option type that allows us to configure the Client.
type Option func(*PasswordReset)

func NewPasswordToken(userID int, token string, options ...Option) *PasswordReset {
	pwr := &PasswordReset{
		UserID:    userID,
		TokenHash: hash(token),
		ExpiresAt: time.Now().Add(ResetDuration),
		Token:     token,
	}
	for _, opt := range options {
		opt(pwr)
	}
	return pwr
}

func WithExpiration(timeout time.Duration) Option {
	return func(pwr *PasswordReset) {
		pwr.ExpiresAt = time.Now().Add(timeout)
	}
}

func PassResetToken() (string, error) {
	return String(PassResetTokenBytes)
}

func hash(token string) string {
	h := sha256.Sum256([]byte(token))
	return base64.URLEncoding.EncodeToString(h[:])
}
