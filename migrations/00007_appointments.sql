-- +goose Up
-- +goose StatementBegin
CREATE TABLE
    IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        client VARCHAR(50) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        email TEXT NOT NULL,
        artist_id INT NOT NULL REFERENCES artists(id) ON DELETE
        type VARCHAR(30) NOT NULL,
        date TIMESTAMPTZ NOT NULL
    );
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS appointments
-- +goose StatementEnd
