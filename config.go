package main

import (
	"os"
	"strconv"

	"github.com/joho/godotenv"
	"github.com/xV0lk/htmx-go/internal/db"
	"github.com/xV0lk/htmx-go/types"
)

type serverConfig struct {
	Port string
}

type config struct {
	Postgres db.PostgresConfig
	SMTP     types.SMTPConfig
	CSRF     types.CsrfConfig
	Server   serverConfig
}

func loadEnvConfig() (config, error) {
	var cfg config
	err := godotenv.Load()
	if err != nil {
		return cfg, err
	}

	cfg.Server.Port = ":1323"

	cfg.Postgres = db.PostgresConfig{
		Host:     os.Getenv("DATABASE_HOST"),
		Port:     os.Getenv("DATABASE_PORT"),
		User:     os.Getenv("DATABASE_USER"),
		Password: os.Getenv("DATABASE_PASSWORD"),
		DBName:   os.Getenv("DATABASE_NAME"),
	}

	portS := os.Getenv("MAIL_TPORT")
	port, err := strconv.Atoi(portS)
	if err != nil {
		return cfg, err
	}
	cfg.SMTP = types.SMTPConfig{
		Host:     os.Getenv("MAIL_THOST"),
		Port:     port,
		Username: os.Getenv("MAIL_TUSER"),
		Password: os.Getenv("MAIL_TPASS"),
	}

	cfg.CSRF = types.CsrfConfig{
		Key:    os.Getenv("CSRF_SECRET"),
		Secure: false,
	}
	return cfg, nil
}
