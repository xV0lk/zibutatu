package db

import (
	"context"
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
	"github.com/xV0lk/htmx-go/types"
)

type SQLite struct {
	db *sql.DB
}

var DB *sql.DB

func NewSQLite() (*SQLite, error) {
	db, err := sql.Open("sqlite3", "./tattoo.db")
	if err != nil {
		return nil, err
	}
	if err := db.Ping(); err != nil {
		return nil, err
	}
	println("Connected to SQLite!")
	return &SQLite{db: db}, nil
}

func (s *SQLite) Close() error {
	return s.db.Close()
}

func (s *SQLite) FetchTasks() ([]types.Item, error) {
	var items []types.Item
	rows, err := s.db.Query("SELECT id, title, completed FROM tasks ORDER BY position;")
	if err != nil {
		fmt.Println("Error: ", err)
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		item := types.Item{}
		err := rows.Scan(&item.ID, &item.Title, &item.Completed)
		if err != nil {
			fmt.Println("Error: ", err)
			return nil, err
		}
		items = append(items, item)
	}
	return items, nil
}

func (s *SQLite) FetchTask(ID int) (types.Item, error) {
	var item = types.Item{}
	row := s.db.QueryRow("SELECT * FROM tasks WHERE id = ?;", ID)
	err := row.Scan(&item.ID, &item.Title, &item.Completed)
	if err != nil {
		fmt.Println("Error: ", err)
		return item, err
	}
	return item, nil
}

func (s *SQLite) UpdateTaskTitle(ID int, title string) (types.Item, error) {
	var item = types.Item{}
	row := s.db.QueryRow("UPDATE tasks SET title = ? WHERE id = ? RETURNING id, title, completed;", title, ID)
	err := row.Scan(&item.ID, &item.Title, &item.Completed)
	if err != nil {
		fmt.Println("Error: ", err)
		return item, err
	}
	return item, nil
}

func (s *SQLite) UpdateTaskCompleted(ID int, completed bool) (types.Item, error) {
	var item = types.Item{}
	row := s.db.QueryRow("UPDATE tasks SET completed = ? WHERE id = ? RETURNING id, title, completed;", completed, ID)
	err := row.Scan(&item.ID, &item.Title, &item.Completed)
	if err != nil {
		fmt.Println("Error: ", err)
		return item, err
	}
	return item, nil
}

func (s *SQLite) FetchCount() (int, error) {
	var count int
	row := s.db.QueryRow("SELECT COUNT(*) FROM tasks;")
	err := row.Scan(&count)
	if err != nil {
		fmt.Println("Error: ", err)
		return 0, err
	}
	return count, nil
}

func (s *SQLite) InsertTask(title string) (types.Item, error) {
	var item = types.Item{}
	count, err := s.FetchCount()
	if err != nil {
		fmt.Println("Error: ", err)
		return item, err
	}
	row := s.db.QueryRow("INSERT INTO tasks (title, position) VALUES (?, ?) RETURNING id, title, completed;", title, count)
	err = row.Scan(&item.ID, &item.Title, &item.Completed)
	if err != nil {
		fmt.Println("Error: ", err)
		return item, err
	}
	return item, nil
}

func (s *SQLite) DeleteTask(ctx context.Context, ID int) error {
	_, err := s.db.Exec("DELETE FROM tasks WHERE id = ?;", ID)
	if err != nil {
		fmt.Println("Error: ", err)
		return err
	}
	rows, err := s.db.Query("SELECT id FROM tasks ORDER BY position;")
	if err != nil {
		fmt.Println("Error: ", err)
		return err
	}
	var ids []int
	for rows.Next() {
		var id int
		err := rows.Scan(&id)
		if err != nil {
			fmt.Println("Error: ", err)
			return err
		}
		ids = append(ids, id)
	}
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		fmt.Println("Error: ", err)
		return err
	}
	defer tx.Rollback()
	for idx, id := range ids {
		_, err := s.db.Exec("UPDATE tasks SET position = ? WHERE id = ?;", idx, id)
		if err != nil {
			fmt.Println("Error: ", err)
			return err
		}
	}
	err = tx.Commit()
	if err != nil {
		fmt.Println("Error: ", err)
		return err
	}
	return nil
}

func (s *SQLite) Setup() error {
	// s.db.Exec("CREATE TABLE IF NOT EXISTS tattoo (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price INTEGER, image TEXT)")
	res, err := s.db.Exec(`create table if not exists tasks (id integer not null primary key, title text, completed boolean default false, position integer);`)
	if err != nil {
		fmt.Println("Error: ", err)
		return err
	}
	println("table created")
	println(res)
	return nil
}

func OpenDB() error {
	db, err := sql.Open("sqlite3", "../tattoo.db")
	if err != nil {
		return err
	}
	DB = db
	return nil
}

func CloseDB() error {
	return DB.Close()
}

func SetupDB() error {
	_, err := DB.Exec(`create table if not exists tasks (id integer not null primary key, title text, completed boolean default false, position integer);`)
	if err != nil {
		return err
	}
	return nil
}
