package db

import (
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
)

type SQLStore struct {
	db *sql.DB
}

// NewSQLite initializes a new SQLStore and returns a pointer to it along with an error.
//
// It opens a connection to a SQLite database located at "./tattoo.db" and checks if the connection is successful.
// If the connection is successful, it creates the "tasks" table if it doesn't already exist.
//
// If there are any errors during the process, the function returns nil and the error.
//
// The function returns a pointer to the initialized SQLStore and nil as the error.
func NewSQLite() (*SQLStore, error) {
	db, err := sql.Open("sqlite3", "./tattoo.db")
	if err != nil {
		return nil, err
	}
	if err := db.Ping(); err != nil {
		return nil, err
	}
	// setup db
	if err := initConfig(db); err != nil {
		return nil, err
	}
	println("Connected to SQLite!")
	return &SQLStore{db: db}, nil
}

// Close closes the SQLStore and returns any error that occurred.
//
// No parameters.
// Returns an error.
func (s *SQLStore) Close() error {
	return s.db.Close()
}

func initConfig(db *sql.DB) error {
	_, err := db.Exec(`create table if not exists tasks (id integer not null primary key, title text, completed boolean default false, position integer);`)
	if err != nil {
		fmt.Println("Error: ", err)
		return err
	}
	// sql config importnt configs
	_, err = db.Exec(`PRAGMA foreign_keys = ON;`)
	if err != nil {
		fmt.Println("Error: ", err)
		return err
	}
	_, err = db.Exec(`PRAGMA journal_mode = WAL;`)
	if err != nil {
		fmt.Println("Error: ", err)
		return err
	}
	_, err = db.Exec(`PRAGMA busy_timeout = 5000;`)
	if err != nil {
		fmt.Println("Error: ", err)
		return err
	}
	return nil
}
