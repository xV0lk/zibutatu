package models

type Client struct {
	ID            int    `db:"id,omitempty"`
	Name          string `db:"name"`
	Phone         string `db:"phone"`
	Email         string `db:"email,unique"`
	Notifications bool   `db:"notifications"`
	StudioID      int    `db:"studio_id"`
}
