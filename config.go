package main

import (
	"log/slog"
	"os"
	"strconv"

	"github.com/joho/godotenv"
	"github.com/xV0lk/htmx-go/internal/db"
	"github.com/xV0lk/htmx-go/models"
)

type serverConfig struct {
	Port string
}

type config struct {
	Postgres db.PostgresConfig
	SMTP     models.SMTPConfig
	CSRF     models.CsrfConfig
	Server   serverConfig
	Env      string
}

func loadEnvConfig() (config, error) {
	var cfg config
	err := godotenv.Load()
	if err != nil {
		return cfg, err
	}

	cfg.Env = os.Getenv("APP_ENV")
	if cfg.Env == "" {
		cfg.Env = "development"
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
	cfg.SMTP = models.SMTPConfig{
		Host:     os.Getenv("MAIL_THOST"),
		Port:     port,
		Username: os.Getenv("MAIL_TUSER"),
		Password: os.Getenv("MAIL_TPASS"),
	}

	cfg.CSRF = models.CsrfConfig{
		Key:    os.Getenv("CSRF_SECRET"),
		Secure: false,
	}
	return cfg, nil
}

// createLogger creates and configures a logger based on the provided configuration.
func createLogger(cfg *config) *slog.Logger {
	// wd, err := os.Getwd()
	// if err != nil {
	// 	log.Fatal("unable to determine working directory")
	// }

	// replacer := func(groups []string, a slog.Attr) slog.Attr {
	// 	if a.Key == slog.SourceKey {
	// 		source := a.Value.Any().(*slog.Source)
	// 		// remove current working directory and only leave the relative path to the program
	// 		if file, ok := strings.CutPrefix(source.File, wd); ok {
	// 			source.File = file
	// 		}
	// 	}
	// 	return a
	// }

	opts := &slog.HandlerOptions{
		Level:     slog.LevelDebug,
		AddSource: false,
		// ReplaceAttr: replacer,
	}

	var handler slog.Handler = slog.NewTextHandler(os.Stdout, opts)
	if cfg.Env == "production" {
		opts.Level = slog.LevelInfo
		handler = slog.NewJSONHandler(os.Stdout, opts)
	}
	logger := slog.New(handler)
	slog.SetDefault(logger)
	return logger
}
