-- +goose Up
-- +goose StatementBegin
CREATE TABLE
    IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title TEXT,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        completed BOOLEAN DEFAULT false,
        position INTEGER
    );
CREATE INDEX IF NOT EXISTS tasks_user_id_idx ON tasks(user_id);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS tasks;
-- +goose StatementEnd
