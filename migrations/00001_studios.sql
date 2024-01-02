-- +goose Up
-- +goose StatementBegin
CREATE TABLE
    IF NOT EXISTS studios (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        address TEXT NOT NULL,
        email TEXT NOT NULL,
        cut INT NOT NULL
    );
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS studios;
-- +goose StatementEnd
