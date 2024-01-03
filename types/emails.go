package types

import (
	"os"

	"github.com/wneessen/go-mail"
)

const (
	DefaultSender = "jorge.otto.415@gmail.com"
)

type EmailService struct {
	DefaultSender string

	client *mail.Client
}

type SMTPConfig struct {
	Host     string
	Port     int
	Username string
	Password string
}

type Email struct {
	From      string
	To        string
	Subject   string
	PlainText string
	Html      string
}

func NewEmailService(config SMTPConfig) (*EmailService, error) {
	c, err := mail.NewClient(config.Host,
		mail.WithPort(config.Port),
		mail.WithSMTPAuth(mail.SMTPAuthPlain),
		mail.WithUsername(config.Username),
		mail.WithPassword(config.Password),
	)
	if err != nil {
		return nil, err
	}
	es := &EmailService{
		client: c,
		// setut fields
	}
	return es, nil
}

func NewDefaultEmailService() (*EmailService, error) {
	return NewEmailService(SMTPConfig{
		Host:     os.Getenv("MAIL_THOST"),
		Port:     2525,
		Username: os.Getenv("MAIL_TUSER"),
		Password: os.Getenv("MAIL_TPASS"),
	})
}

func (es *EmailService) SendEmail(email Email) error {
	m := mail.NewMsg()
	if err := es.setFrom(m, email); err != nil {
		return err
	}
	if err := m.To(email.To); err != nil {
		return err
	}
	m.Subject(email.Subject)
	switch {
	case email.Html != "" && email.PlainText != "":
		m.SetBodyString(mail.TypeTextHTML, email.Html)
		m.AddAlternativeString(mail.TypeTextPlain, email.PlainText)
	case email.Html != "":
		m.SetBodyString(mail.TypeTextHTML, email.Html)
	case email.PlainText != "":
		m.SetBodyString(mail.TypeTextPlain, email.PlainText)
	}
	return es.client.DialAndSend(m)
}

func (es *EmailService) ForgotPassword(to, resetURL string) error {
	email := Email{
		To:        to,
		Subject:   "Reset your password",
		PlainText: "Click here to reset your password: " + resetURL,
		Html:      `<p>Click here to reset your password: <a href="` + resetURL + `">` + resetURL + `</a></p>`,
	}
	return es.SendEmail(email)
}

func (es *EmailService) setFrom(msg *mail.Msg, email Email) error {
	var from string
	switch {
	case email.From != "":
		from = email.From
	case es.DefaultSender != "":
		from = es.DefaultSender
	default:
		from = DefaultSender
	}
	return msg.From(from)
}
