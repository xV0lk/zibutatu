package db

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users ( 
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email TEXT UNIQUE NOT NULL,
	studio_id INT NULL,
	is_admin BOOL DEFAULT false,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	language CHAR(5) DEFAULT 'es-CO' NOT NULL,
	password TEXT NOT NULL
	);
`

const createStudiosTable = `
CREATE TABLE IF NOT EXISTS studios (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	address TEXT NOT NULL,
	email TEXT NOT NULL,
	comission INT NOT NULL
);
`

const createTasksTable = `
CREATE TABLE IF NOT EXISTS tasks (
	id SERIAL PRIMARY KEY,
	title TEXT,
	completed BOOLEAN DEFAULT false,
	position INTEGER
);
`

func NewPsql() (*pgxpool.Pool, error) {
	godotenv.Load(".env")
	dbpool, err := pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to create connection pool: %v\n", err)
		return nil, err
	}
	return dbpool, nil
}

func SetUpTables(db *pgxpool.Pool) error {
	_, err := db.Exec(context.Background(), createUsersTable)
	if err != nil {
		fmt.Println("Error: ", err)
		return err
	}
	_, err = db.Exec(context.Background(), createStudiosTable)
	if err != nil {
		fmt.Println("Error: ", err)
		return err
	}
	_, err = db.Exec(context.Background(), createTasksTable)
	if err != nil {
		fmt.Println("Error: ", err)
		return err
	}
	return err
}
