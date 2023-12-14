package views

type HttpError struct {
	Code        int
	Msg         string
	Description string
}

type RenderError struct {
	Err bool
	Msg string
}
