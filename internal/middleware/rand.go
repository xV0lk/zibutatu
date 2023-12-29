package middleware

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
)

const (
	SessionTokenBytes = 32
)

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
