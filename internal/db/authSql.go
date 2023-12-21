package db

type UserStore interface {
	Login() (string, error)
}

func (s *SQLStore) Login() (string, error) {

	return "Logged", nil
}
