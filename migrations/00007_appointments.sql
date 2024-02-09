-- +goose Up
-- +goose StatementBegin
CREATE TABLE
    IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        client VARCHAR(50) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        email TEXT NOT NULL,
        artist_id INT NOT NULL REFERENCES artists(id) ON DELETE SET NULL,
        user_create_id INT NOT NULL REFERENCES users(id) ON DELETE SET NULL,
        type VARCHAR(30) NOT NULL,
        date TIMESTAMPTZ NOT NULL
    );

CREATE INDEX IF NOT EXISTS appointments_artist_id_idx ON appointments(artist_id);
CREATE INDEX IF NOT EXISTS appointments_user_create_id_idx ON appointments(user_create_id);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS appointments;
DROP INDEX IF EXISTS appointments_artist_id_idx;
DROP INDEX IF EXISTS appointments_user_create_id_idx;
-- +goose StatementEnd
