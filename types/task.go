package types

type Item struct {
	ID        int
	Title     string
	Completed bool
}

type Tasks struct {
	Items          []Item
	Count          int
	CompletedCount int
}

type TaskBody struct {
	Title string `schema:"title,required"`
}

type TaskStatus struct {
	Completed string `schema:"completed"`
}
