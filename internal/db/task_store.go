package db

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/xV0lk/htmx-go/models"
)

type TaskStore interface {
	FetchTasks(uId int) ([]*models.Item, error)
	FetchTask(ID int) (*models.Item, error)
	InsertTask(tBody models.TaskBody) (*models.Item, error)
	UpdateTaskTitle(ID int, title string) (*models.Item, error)
	UpdateTaskCompleted(ID int, completed bool) (*models.Item, error)
	DeleteTask(ctx context.Context, ID int) error
	OderTasks(ctx context.Context, values []int) error
	FetchCount(uId int) (int, error)
	FetchCompletedCount(uId int) (int, error)

	Closer
}

type PsTaskStore struct {
	db *pgxpool.Pool
}

func NewPsTaskStore(db *pgxpool.Pool) *PsTaskStore {
	return &PsTaskStore{
		db,
	}
}

func (s *PsTaskStore) Close() {
	s.db.Close()
}

// FetchTasks fetches tasks from the SQLStore.
//
// It does not take any parameters.
// It returns a slice of models.Item and an error.
func (s *PsTaskStore) FetchTasks(uId int) ([]*models.Item, error) {
	query := `SELECT id, title, completed 
				FROM tasks 
				WHERE user_id = $1
				ORDER BY position;`
	rows, err := s.db.Query(context.Background(), query, uId)
	if err != nil {
		fmt.Println("Error: ", err)
		return nil, err
	}
	defer rows.Close()
	items, err := pgx.CollectRows(rows, pgx.RowToAddrOfStructByNameLax[models.Item])
	if err != nil {
		fmt.Println("Error: ", err)
		return nil, err
	}
	return items, nil
}

// FetchTask fetches a task from the SQLStore based on the given ID.
//
// ID: the ID of the task to fetch.
// returns: the fetched task as a models.Item and any error encountered.
func (s *PsTaskStore) FetchTask(ID int) (*models.Item, error) {
	item := models.Item{}
	query := "SELECT id, title, completed FROM tasks WHERE id = $1;"
	row := s.db.QueryRow(context.Background(), query, ID)
	err := row.Scan(&item.ID, &item.Title, &item.Completed)
	if err != nil {
		fmt.Println("Error: ", err)
		return &item, err
	}
	return &item, nil
}

// UpdateTaskTitle updates the title of a task in the SQLStore.
//
// It takes an ID (int) and a title (string) as parameters and returns an Item and an error.
func (s *PsTaskStore) UpdateTaskTitle(ID int, title string) (*models.Item, error) {
	item := models.Item{}
	query := "UPDATE tasks SET title = $1 WHERE id = $2 RETURNING id, title, completed;"
	row := s.db.QueryRow(context.Background(), query, title, ID)
	err := row.Scan(&item.ID, &item.Title, &item.Completed)
	if err != nil {
		fmt.Println("Error: ", err)
		return &item, err
	}
	return &item, nil
}

// UpdateTaskCompleted updates the completion status of a task in the SQLStore.
//
// It takes an ID of the task to be updated and a boolean indicating the new completion status.
// It returns a models.Item struct representing the updated task and an error if any occurred.
func (s *PsTaskStore) UpdateTaskCompleted(ID int, completed bool) (*models.Item, error) {
	item := models.Item{}
	query := "UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING id, title, completed;"
	row := s.db.QueryRow(context.Background(), query, completed, ID)
	err := row.Scan(&item.ID, &item.Title, &item.Completed)
	if err != nil {
		fmt.Println("Error in update: ", err)
		return &item, err
	}
	return &item, nil
}

// FetchCount fetches the count of tasks from the SQLStore.
//
// It does not take any parameters.
// It returns an integer and an error.
func (s *PsTaskStore) FetchCount(uId int) (int, error) {
	var count int
	query := "SELECT COUNT(*) FROM tasks WHERE user_id = $1;"
	row := s.db.QueryRow(context.Background(), query, uId)
	err := row.Scan(&count)
	if err != nil {
		fmt.Println("Error: ", err)
		return 0, err
	}
	return count, nil
}

func (s *PsTaskStore) FetchCompletedCount(uId int) (int, error) {
	var count int
	query := "SELECT COUNT(*) FROM tasks WHERE completed = true AND user_id = $1;"
	row := s.db.QueryRow(context.Background(), query, uId)
	err := row.Scan(&count)
	if err != nil {
		fmt.Println("Error: ", err)
		return 0, err
	}
	return count, nil
}

// InsertTask inserts a task into the SQLStore.
//
// It takes a title string as a parameter and returns a models.Item and an error.
func (s *PsTaskStore) InsertTask(tBody models.TaskBody) (*models.Item, error) {
	item := models.Item{}
	count, err := s.FetchCount(tBody.UserId)
	if err != nil {
		fmt.Println("Error: ", err)
		return &item, err
	}
	query := "INSERT INTO tasks (title, user_id, position) VALUES ($1, $2, $3) RETURNING id, title, completed;"
	row := s.db.QueryRow(context.Background(), query, tBody.Title, tBody.UserId, count)
	err = row.Scan(&item.ID, &item.Title, &item.Completed)
	if err != nil {
		fmt.Println("Error: ", err)
		return &item, err
	}
	return &item, nil
}

// DeleteTask deletes a task from the SQLStore.
//
// The function takes the following parameters:
// - ctx: the context.Context for the function.
// - ID: the ID of the task to be deleted.
//
// The function returns an error if there is any.
func (s *PsTaskStore) DeleteTask(ctx context.Context, ID int) error {
	_, err := s.db.Exec(context.Background(), "DELETE FROM tasks WHERE id = $1;", ID)
	if err != nil {
		fmt.Println("Error: ", err)
		return err
	}
	rows, err := s.db.Query(context.Background(), "SELECT id FROM tasks ORDER BY position;")
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
	tx, err := s.db.Begin(ctx)
	if err != nil {
		fmt.Println("Error: ", err)
		return err
	}
	defer tx.Rollback(ctx)
	for idx, id := range ids {
		_, err := s.db.Exec(ctx, "UPDATE tasks SET position = $1 WHERE id = $2;", idx, id)
		if err != nil {
			fmt.Println("Error: ", err)
			return err
		}
	}
	err = tx.Commit(ctx)
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
func (s *PsTaskStore) OderTasks(ctx context.Context, values []int) error {
	tx, err := s.db.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)
	for i, v := range values {
		_, err := tx.Exec(ctx, "UPDATE tasks SET position = $1 WHERE id = $2;", i, v)
		if err != nil {
			return err
		}
	}
	if err := tx.Commit(ctx); err != nil {
		return err
	}
	return nil
}
