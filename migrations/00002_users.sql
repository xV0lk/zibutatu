-- +goose Up
-- +goose StatementBegin
CREATE TABLE
    IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email TEXT UNIQUE NOT NULL,
        studio_id INT NULL REFERENCES studios(id) ON DELETE SET NULL,
				is_admin BOOL DEFAULT false,
				created_at TIMESTAMP DEFAULT NOW(),
				updated_at TIMESTAMP DEFAULT NOW(),
				language CHAR(5) DEFAULT 'es-CO' NOT NULL,
				password TEXT NOT NULL
    );
CREATE INDEX IF NOT EXISTS users_studio_id_idx ON users(studio_id);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS users;
-- +goose StatementEnd
