package models

import "time"

type Artist struct {
	ID        int       `db:"id,omitempty"`
	Name      string    `db:"name"`
	Phone     string    `db:"phone"`
	Email     string    `db:"email,unique"`
	Role      string    `db:"role"`
	StudioID  int       `db:"studio_id"`
	CreatedAt time.Time `db:"created_at"`
}

const (
	RoleArtist     = "artist"
	RoleAdmin      = "admin"
	RoleAccountant = "accountant"
	RoleScheduler  = "scheduler"
)
