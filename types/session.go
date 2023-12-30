package types

type Session struct {
	ID        int    `db:"id,omitempty"`
	UserID    int    `db:"user_id,unique"`
	TokenHash string `db:"token_hash,unique"`
	// not to be stores in the database
	Token *string
}
