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
	Title string `form:"title"`
}

type TaskStatus struct {
	Completed string `form:"completed"`
}
