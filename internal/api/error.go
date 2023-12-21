package api

// import (
// 	"fmt"

// 	"github.com/labstack/echo"
// 	"github.com/xV0lk/htmx-go/views"
// 	eViews "github.com/xV0lk/htmx-go/views/error"
// )

// func CustomError(err error, c echo.Context) {
// 	var code int
// 	if he, ok := err.(*echo.HTTPError); ok {
// 		code = he.Code
// 	}
// 	httpE := views.HttpError{
// 		Code:        code,
// 		Msg:         "Se presentó un error en el servidor al procesar tu solicitud.",
// 		Description: "Error en el servidor",
// 	}
// 	c.Logger().Error(fmt.Sprintf("HTTP error occurred: %s\n", err))
// 	switch code {
// 	case 404:
// 		httpE.Msg = "La página que buscabas no pudo ser encontrada."
// 		httpE.Description = "Página no existe"
// 	case 401:
// 		httpE.Msg = "No estas autorizado para acceder a este recurso."
// 		httpE.Description = "No autorizado"
// 	case 403:
// 		httpE.Msg = "No estas autorizado para acceder a este recurso."
// 		httpE.Description = "No autorizado"
// 	case 503:
// 		httpE.Msg = "Lo sentimos, en este momento el servicio no disponible."
// 		httpE.Description = "Servicio no disponible"
// 	}
// 	errorPage := eViews.ErrorPage(httpE)
// 	errorPage.Render(c.Request().Context(), c.Response().Writer)
// }
