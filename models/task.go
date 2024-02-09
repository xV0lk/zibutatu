package models

type Item struct {
	ID        int
	Title     string
	UserId    int
	Completed bool
}

type Tasks struct {
	Items          []*Item
	Count          int
	CompletedCount int
}

type TaskBody struct {
	Title  string `schema:"title,required"`
	UserId int    `schema:"user_id,required"`
}

type TaskStatus struct {
	Completed string `schema:"completed"`
}
