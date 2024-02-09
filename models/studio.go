package models

type Studio struct {
	ID      int    `db:"id,omitempty"`
	Name    string `db:"name"`
	Address string `db:"address"`
	Email   string `db:"email"`
	Cut     int    `db:"cut"`
}

type NewStudio struct {
	Name    string
	Address string
	Email   string
	Cut     int
}
