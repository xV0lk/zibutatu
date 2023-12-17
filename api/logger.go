package api

import "github.com/labstack/echo/v4/middleware"

var LConfig = middleware.LoggerConfig{
	Format: `{"time":"${time_rfc3339_nano}","id":"${id}",` +
		`"method":"${method}","uri":"${uri}",` +
		`"status":${status},"error":"${error}",` +
		`,"bytes_in":${bytes_in},"bytes_out":${bytes_out}}` + "\n",
	CustomTimeFormat: "2006-01-02 15:04:05",
}
