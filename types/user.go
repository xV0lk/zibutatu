package types

import (
	"context"
	"errors"
	"regexp"
	"strings"
	"time"

	mw "github.com/xV0lk/htmx-go/internal/middleware"
	"golang.org/x/crypto/bcrypt"
)

const (
	bcryptCost  = 12
	minFNameLen = 2
	minLNameLen = 2
	minPassLen  = 7
)

type User struct {
	ID        int       `db:"id,omitempty"`
	FirstName string    `db:"first_name"`
	LastName  string    `db:"last_name"`
	Email     string    `db:"email,omitempty,unique"`
	StudioID  *int      `db:"studio_id,omitempty"` // this is made a pointer so i can pass and receive nil values without issues. since this is a nullable field
	IsAdmin   bool      `db:"is_admin,omitempty"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
	Language  string    `db:"language,omitempty"`
	Password  string    `db:"-"`
}

type UserPass struct {
	ID        int       `db:"id,omitempty"`
	FirstName string    `db:"first_name"`
	LastName  string    `db:"last_name"`
	Email     string    `db:"email,omitempty,unique"`
	StudioID  *int      `db:"studio_id,omitempty"` // this is made a pointer so i can pass and receive nil values without issues. since this is a nullable field
	IsAdmin   bool      `db:"is_admin,omitempty"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
	Language  string    `db:"language,omitempty"`
	Password  string    `db:"password,omitempty"`
}

type NewUser struct {
	FirstName string
	LastName  string
	Email     string
	StudioID  *int
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
		errors["firstName"] = mw.Translate(ctx, "First name must be at least %d characters long", minFNameLen)
	}
	if len(params.LastName) < minLNameLen {
		errors["lastName"] = mw.Translate(ctx, "Last name must be at least %d characters long", minLNameLen)
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
		return errors.New(mw.Translate(ctx, "Invalid email address"))
	}
	return nil
}

func ValidatePassword(ctx context.Context, password string) []string {
	errors := []string{}
	if len(password) < minPassLen {
		errors = append(errors, mw.Translate(ctx, "password must be at least %d characters long", minPassLen))
	}
	if !regexp.MustCompile(`[a-z]`).MatchString(password) {
		errors = append(errors, mw.Translate(ctx, "password must contain at least one lowercase letter"))
	}
	if !regexp.MustCompile(`[A-Z]`).MatchString(password) {
		errors = append(errors, mw.Translate(ctx, "password must contain at least one uppercase letter"))
	}
	if !regexp.MustCompile(`[0-9]`).MatchString(password) {
		errors = append(errors, mw.Translate(ctx, "password must contain at least one number"))
	}
	if !regexp.MustCompile(`[^a-zA-Z0-9]`).MatchString(password) {
		errors = append(errors, mw.Translate(ctx, "password must contain at least one special character"))
	}
	return errors
}

func NewUserFromParams(params *NewUser) (*User, error) {
	cryptPass, err := bcrypt.GenerateFromPassword([]byte(params.Password), bcryptCost)
	if err != nil {
		return nil, err
	}
	return &User{
		FirstName: params.FirstName,
		LastName:  params.LastName,
		Email:     params.Email,
		StudioID:  params.StudioID,
		IsAdmin:   params.IsAdmin,
		Password:  string(cryptPass),
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		Language:  "es-CO",
	}, nil
}

// IsValidPassword checks if the provided input password matches the stored hashed password.
// It uses bcrypt.CompareHashAndPassword to compare the hashed password with the input password.
// Returns true if the passwords match, otherwise returns false.
func IsValidPassword(hashedPass, inputPass string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hashedPass), []byte(inputPass)) == nil
}
