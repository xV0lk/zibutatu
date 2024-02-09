-- +goose Up
-- +goose StatementBegin
CREATE TABLE
    IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email TEXT UNIQUE NOT NULL,
        is_admin BOOL NOT NULL DEFAULT false,
        is_active BOOL NOT NULL DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        language CHAR(5) DEFAULT 'es-CO' NOT NULL,
        password TEXT NOT NULL,
        artist_id INT NULL REFERENCES artists(id) ON DELETE SET NULL
    );

INSERT INTO "users" ("id", "first_name", "last_name", "email", "is_admin", "created_at", "updated_at", "language", "password", "is_active", "artist_id") VALUES
(1,	'Jorge',	'Rojas',	'jorge.otto.415@gmail.com',	't',	'2024-01-01 16:13:03.916567',	'2024-01-01 16:13:03.916567',	'es-CO',	'$2a$12$3xbIkk75y9qZow0htvCBtOldG4pR46qBFc1u/dbQ4Rpv3gW4RF3zG',	't',	NULL);

CREATE INDEX IF NOT EXISTS users_artist_id_idx ON users(artist_id);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS users;
DROP INDEX IF EXISTS users_artist_id_idx;
-- +goose StatementEnd