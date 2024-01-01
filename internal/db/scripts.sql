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

CREATE TABLE
    IF NOT EXISTS studios (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        address TEXT NOT NULL,
        email TEXT NOT NULL,
        cut INT NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title TEXT,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        completed BOOLEAN DEFAULT false,
        position INTEGER
    );
CREATE INDEX IF NOT EXISTS tasks_user_id_idx ON tasks(user_id);

CREATE TABLE
    IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        user_id INT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token_hash TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    );

SELECT
    users.id,
    users.first_name,
    users.last_name,
    users.email,
    users.studio_id,
    users.is_admin,
    users.created_at,
    users.updated_at,
    users.language,
    users.password
FROM sessions
    JOIN users ON sessions.user_id = users.id
WHERE token_hash = $1;


INSERT INTO
    sessions (user_id, token_hash)
VALUES ($1, $2) ON CONFLICT (user_id) DO
UPDATE
SET token_hash = $2;