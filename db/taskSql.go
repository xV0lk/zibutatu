package db

import (
	"context"
	"fmt"

	"github.com/xV0lk/htmx-go/types"
)

type TaskStore interface {
	FetchTasks() ([]types.Item, error)
	FetchTask(ID int) (types.Item, error)
	InsertTask(title string) (types.Item, error)
	UpdateTaskTitle(ID int, title string) (types.Item, error)
	UpdateTaskCompleted(ID int, completed bool) (types.Item, error)
	DeleteTask(ctx context.Context, ID int) error
	OderTasks(ctx context.Context, values []int) error
	FetchCount() (int, error)
	FetchCompletedCount() (int, error)
}

// FetchTasks fetches tasks from the SQLStore.
//
// It does not take any parameters.
// It returns a slice of types.Item and an error.
func (s *SQLStore) FetchTasks() ([]types.Item, error) {
	var items []types.Item
	query := "SELECT id, title, completed FROM tasks ORDER BY position;"
	rows, err := s.db.Query(query)
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

// FetchTask fetches a task from the SQLStore based on the given ID.
//
// ID: the ID of the task to fetch.
// returns: the fetched task as a types.Item and any error encountered.
func (s *SQLStore) FetchTask(ID int) (types.Item, error) {
	item := types.Item{}
	query := "SELECT id, title, completed FROM tasks WHERE id = ?;"
	row := s.db.QueryRow(query, ID)
	err := row.Scan(&item.ID, &item.Title, &item.Completed)
	if err != nil {
		fmt.Println("Error: ", err)
		return item, err
	}
	return item, nil
}

// UpdateTaskTitle updates the title of a task in the SQLStore.
//
// It takes an ID (int) and a title (string) as parameters and returns an Item and an error.
func (s *SQLStore) UpdateTaskTitle(ID int, title string) (types.Item, error) {
	item := types.Item{}
	query := "UPDATE tasks SET title = ? WHERE id = ? RETURNING id, title, completed;"
	row := s.db.QueryRow(query, title, ID)
	err := row.Scan(&item.ID, &item.Title, &item.Completed)
	if err != nil {
		fmt.Println("Error: ", err)
		return item, err
	}
	return item, nil
}

// UpdateTaskCompleted updates the completion status of a task in the SQLStore.
//
// It takes an ID of the task to be updated and a boolean indicating the new completion status.
// It returns a types.Item struct representing the updated task and an error if any occurred.
func (s *SQLStore) UpdateTaskCompleted(ID int, completed bool) (types.Item, error) {
	item := types.Item{}
	query := "UPDATE tasks SET completed = ? WHERE id = ? RETURNING id, title, completed;"
	row := s.db.QueryRow(query, completed, ID)
	err := row.Scan(&item.ID, &item.Title, &item.Completed)
	if err != nil {
		fmt.Println("Error: ", err)
		return item, err
	}
	return item, nil
}

// FetchCount fetches the count of tasks from the SQLStore.
//
// It does not take any parameters.
// It returns an integer and an error.
func (s *SQLStore) FetchCount() (int, error) {
	var count int
	row := s.db.QueryRow("SELECT COUNT(*) FROM tasks;")
	err := row.Scan(&count)
	if err != nil {
		fmt.Println("Error: ", err)
		return 0, err
	}
	return count, nil
}

func (s *SQLStore) FetchCompletedCount() (int, error) {
	var count int
	row := s.db.QueryRow("SELECT COUNT(*) FROM tasks WHERE completed = true;")
	err := row.Scan(&count)
	if err != nil {
		fmt.Println("Error: ", err)
		return 0, err
	}
	return count, nil
}

// InsertTask inserts a task into the SQLStore.
//
// It takes a title string as a parameter and returns a types.Item and an error.
func (s *SQLStore) InsertTask(title string) (types.Item, error) {
	item := types.Item{}
	count, err := s.FetchCount()
	if err != nil {
		fmt.Println("Error: ", err)
		return item, err
	}
	query := "INSERT INTO tasks (title, position) VALUES (?, ?) RETURNING id, title, completed;"
	row := s.db.QueryRow(query, title, count)
	err = row.Scan(&item.ID, &item.Title, &item.Completed)
	if err != nil {
		fmt.Println("Error: ", err)
		return item, err
	}
	return item, nil
}

// DeleteTask deletes a task from the SQLStore.
//
// The function takes the following parameters:
// - ctx: the context.Context for the function.
// - ID: the ID of the task to be deleted.
//
// The function returns an error if there is any.
func (s *SQLStore) DeleteTask(ctx context.Context, ID int) error {
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

// OderTasks updates the position of tasks in the SQLStore.
//
// It takes in a context.Context and a slice of integers as the values parameter.
// The function returns an error.
func (s *SQLStore) OderTasks(ctx context.Context, values []int) error {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()
	for i, v := range values {
		_, err := tx.Exec("UPDATE tasks SET position = ? WHERE id = ?;", i, v)
		if err != nil {
			return err
		}
	}
	if err := tx.Commit(); err != nil {
		return err
	}
	return nil
}
