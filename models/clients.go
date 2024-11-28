package models

type Client struct {
	ID              int    `db:"id,omitempty"`
	Name            string `db:"name"`
	Phone           string `db:"phone"`
	Email           string `db:"email,unique"`
	Notifications   bool   `db:"notifications"`
	asociatedStudio string `db:"asociated_studio"`
	StudioID        int    `db:"studio_id"`
}
