-- +goose Up
-- +goose StatementBegin
CREATE TABLE
    IF NOT EXISTS artists (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        email TEXT NOT NULL,
        role VARCHAR(20) NOT NULL,
        studio_id INT NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

CREATE INDEX IF NOT EXISTS artists_studio_id_idx ON artists(studio_id);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS artists;
DROP INDEX IF EXISTS artists_studio_id_idx;
-- +goose StatementEnd
