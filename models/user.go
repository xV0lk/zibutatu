package models

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"regexp"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
)

const (
	bcryptCost  = 12
	minFNameLen = 2
	minLNameLen = 2
	minPassLen  = 7
)

var (
	ErrEncryptPassword = errors.New("User: error encrypting password")
	ErrInvalidEmail    = errors.New("User: invalid email")
)

type User struct {
	ID        int       `db:"id,omitempty"`
	FirstName string    `db:"first_name"`
	LastName  string    `db:"last_name"`
	Email     string    `db:"email,unique"`
	IsAdmin   bool      `db:"is_admin"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
	Language  string    `db:"language"`
	Password  string    `db:"password"`
	IsActive  bool      `db:"is_active"`
	ArtistID  *int      `db:"artist_id"` // this is made a pointer so i can pass and receive nil values without issues. since this is a nullable field
}

func (u User) LogValue() slog.Value {
	return slog.IntValue(u.ID)
}

type NewUser struct {
	FirstName string
	LastName  string
	Email     string
	ArtistID  *int
	IsAdmin   bool
	Password  string
}

type AuthParams struct {
	Email    string `schema:"email"`
	Password string `schema:"password"`
}

func (params NewUser) Validate(ctx context.Context) map[string]string {
	errors := map[string]string{}
	if len(params.FirstName) < minFNameLen {
		errors["firstName"] = fmt.Sprintf("First name must be at least %d characters long", minFNameLen)
	}
	if len(params.LastName) < minLNameLen {
		errors["lastName"] = fmt.Sprintf("Last name must be at least %d characters long", minLNameLen)
	}
	if err := ValidatePassword(ctx, params.Password); len(err) > 0 {
		errors["password"] = strings.Join(err, ", ")
	}
	if err := ValidateEmail(ctx, params.Email); err != nil {
		errors["email"] = err.Error()
	}

	return errors
}

func ValidateEmail(ctx context.Context, email string) error {
	if !regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`).MatchString(email) {
		return ErrInvalidEmail
	}
	return nil
}

func ValidatePassword(ctx context.Context, password string) []string {
	errors := []string{}
	if len(password) < minPassLen {
		errors = append(errors, fmt.Sprintf("password must be at least %d characters long", minPassLen))
	}
	if !regexp.MustCompile(`[a-z]`).MatchString(password) {
		errors = append(errors, "password must contain at least one lowercase letter")
	}
	if !regexp.MustCompile(`[A-Z]`).MatchString(password) {
		errors = append(errors, "password must contain at least one uppercase letter")
	}
	if !regexp.MustCompile(`[0-9]`).MatchString(password) {
		errors = append(errors, "password must contain at least one number")
	}
	if !regexp.MustCompile(`[^a-zA-Z0-9]`).MatchString(password) {
		errors = append(errors, "password must contain at least one special character")
	}
	return errors
}

func NewUserFromParams(params *NewUser) (*User, error) {
	cryptPass, err := EncryptPassword(params.Password)
	if err != nil {
		return nil, err
	}
	return &User{
		FirstName: params.FirstName,
		LastName:  params.LastName,
		Email:     strings.ToLower(params.Email),
		ArtistID:  params.ArtistID,
		IsAdmin:   params.IsAdmin,
		Password:  string(cryptPass),
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		Language:  "es-CO",
		IsActive:  true,
	}, nil
}

// IsValidPassword checks if the provided input password matches the stored hashed password.
// It uses bcrypt.CompareHashAndPassword to compare the hashed password with the input password.
// Returns true if the passwords match, otherwise returns false.
func IsValidPassword(hashedPass, inputPass string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hashedPass), []byte(inputPass)) == nil
}

func EncryptPassword(password string) (string, error) {
	cryptPass, err := bcrypt.GenerateFromPassword([]byte(password), bcryptCost)
	if err != nil {
		return "", ErrEncryptPassword
	}
	return string(cryptPass), nil
}
