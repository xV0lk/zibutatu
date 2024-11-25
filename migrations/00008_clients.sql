-- +goose Up
-- +goose StatementBegin
CREATE TABLE
    IF NOT EXISTS clients (
        id VARCHAR(20) PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        email TEXT NOT NULL,
        notifications BOOLEAN NOT NULL DEFAULT TRUE,
        asociatedStudio VARCHAR(100) NOT NULL,
        studioId VARCHAR(20) NOT NULL,

        -- + Restrictions for the information in the columns match with the studios table
        CONSTRAINT fk_studioName FOREIGN KEY (asociatedStudio) REFERENCES studios(name),
         CONSTRAINT fk_studioId FOREIGN KEY (studioId) REFERENCES studios(id),

    );

-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS clients;

-- +goose StatementEnd