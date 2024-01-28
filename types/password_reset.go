package types

import (
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
