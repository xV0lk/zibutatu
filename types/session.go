package types

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"time"
)

const (
	SessionTokenBytes = 32
)

type Session struct {
	ID        int       `db:"id,omitempty"`
	UserID    int       `db:"user_id,unique"`
	TokenHash string    `db:"token_hash,unique"`
	CreatedAt time.Time `db:"created_at"`
	// not to be stored in the database
	Token string
}

type CsrfConfig struct {
	Key    string
	Secure bool
}

func Bytes(n int) ([]byte, error) {
	b := make([]byte, n)
	nRead, err := rand.Read(b)
	if err != nil {
		return nil, fmt.Errorf("Bytes: %w", err)
	}
	if nRead < n {
		return nil, fmt.Errorf("could not read enough bytes")
	}
	return b, nil
}

// String return a random string of n bytes using crypto/rand
func String(n int) (string, error) {
	b, err := Bytes(n)
	if err != nil {
		return "", fmt.Errorf("String: %w", err)
	}
	return base64.URLEncoding.EncodeToString(b), nil
}

func SessionToken() (string, error) {
	return String(SessionTokenBytes)
}
