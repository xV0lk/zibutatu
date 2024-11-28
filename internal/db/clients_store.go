package db

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/xV0lk/htmx-go/models"
)

type PsclientStore struct {
	db *pgxpool.Pool
}

func NewPsclientStore(db *pgxpool.Pool) *PsclientStore {

	return &PsclientStore{
		db,
	}
}

func (s *PsclientStore) Close() {
	s.db.Close()
}

func (s *PsclientStore) createClient(ctx context.Context, client *models.Client) (*models.Client, error) {

	queryCheck := `SELECT 1 FROM clients WHERE id = 1$, studioId = 2$`

	var exists int

	err := s.db.QueryRow(ctx, queryCheck, client.ID, client.StudioID).Scan(&exists)

	if err == nil {

		fmt.Printf("The client already exist in the studio %v", client.StudioID)
	} else {

		query := `INSERT INTO clients (id, name, phone, email, notifications, asociatedStudio, studioId)
	VALUES ($1, $2, $3, $4, $5, $6, $7)`

		err := s.db.QueryRow(ctx, query, client.ID, client.Name, client.Notifications, client.Phone, client.StudioID)

		if err != nil {
			fmt.Println("Inserting Error")
		}
	}

	return client, nil

}

func (s *PsclientStore) fetchClient(id int, ctx context.Context) ([]*models.Client, error) {

	query := `SELECT * FROM clients WHERE id = 1$`

	row, err := s.db.Query(ctx, query, id) //.Scan(&client.ID, &client.Name, &client.Notifications, &client.Phone, &client.StudioID)

	client, err := pgx.CollectRows(row, pgx.RowToAddrOfStructByNameLax[models.Client])
	if err != nil {
		fmt.Println("Error: ", err)
		return nil, err
	}

	return client, nil

}

// UpdateTaskTitle updates the title of a task in the SQLStore.
//
// It takes an ID (int) and a title (string) as parameters and returns an Item and an error.

func (s *PsclientStore) updateClient(id int) (*models.Client, error) {

	client := &models.Client{}

	query := `UPDATE clients SET (name = $2, phone = $3, email = $4, notifications = $5, asociatedStudio = $6, studioId = $7) WHERE id = 1$`

	err := s.db.QueryRow(context.Background(), query, id, client.Name, client.Notifications, client.Phone, client.StudioID)

	if err != nil {
		fmt.Println("Error: ", err)

	}

	return client, nil

}

func (s *PsclientStore) deleteClient(id int) error {

	query := `DELETE * FROM clients WHERE Id = 1$`

	_, err := s.db.Exec(context.Background(), query, id)

	if err != nil {
		fmt.Println("Error: ", err)

	}

	return nil

}
