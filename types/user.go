package types

import "time"

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
