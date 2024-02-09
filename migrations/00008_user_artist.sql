-- +goose Up
-- +goose StatementBegin
ALTER TABLE users
		ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT TRUE,
		ADD COLUMN
				artist_id INT NULL REFERENCES artists(id) ON DELETE SET NULL,
		DROP COLUMN studio_id;

CREATE INDEX IF NOT EXISTS users_artist_id_idx ON users(artist_id);
DROP INDEX IF EXISTS users_studio_id_idx
		 
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE users
		DROP COLUMN is_active,
		ADD COLUMN
				studio_id INT NULL REFERENCES studios(id) ON DELETE SET NULL,
		DROP COLUMN artist_id;

CREATE INDEX IF NOT EXISTS users_studio_id_idx ON users(studio_id);
DROP INDEX IF EXISTS users_artist_id_idx
-- +goose StatementEnd
