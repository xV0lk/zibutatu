package models

type Appointment struct {
	ID     int
	Client string
	Phone  string
	Email  string
	Artist string
	Day    int
	Month  string
}

// var appList []*models.Appointment
// appPaola := &models.Appointment{
// 	ID:     1,
// 	Client: "Paola Taborda",
// 	Phone:  "312 425 4321",
// 	Email:  "paola.taborda@example.com",
// 	Artist: "Juanita",
// 	Day:    27,
// 	Month:  "Diciembre",
// }

// appJorge := &models.Appointment{
// 	ID:     2,
// 	Client: "Jorge Rojas",
// 	Phone:  "317 376 8552",
// 	Email:  "jorge.rojas@example.com",
// 	Artist: "Juanita",
// 	Day:    15,
// 	Month:  "Enero",
// }

// appDiego := &models.Appointment{
// 	ID:     3,
// 	Client: "Diego Taborda",
// 	Phone:  "321 234 5298",
// 	Email:  "diego.taborda@example.com",
// 	Artist: "Juanita",
// 	Day:    10,
// 	Month:  "Febrero",
// }
// appMaria := &models.Appointment{
// 	ID:     4,
// 	Client: "María López",
// 	Phone:  "318 765 4321",
// 	Email:  "maria.lopez@example.com",
// 	Artist: "Juanita",
// 	Day:    20,
// 	Month:  "Marzo",
// }

// appPedro := &models.Appointment{
// 	ID:     5,
// 	Client: "Pedro Ramírez",
// 	Phone:  "315 987 6543",
// 	Email:  "pedro.ramirez@example.com",
// 	Artist: "Juanita",
// 	Day:    5,
// 	Month:  "Abril",
// }

// appLuisa := &models.Appointment{
// 	ID:     6,
// 	Client: "Luisa Fernández",
// 	Phone:  "314 876 5432",
// 	Email:  "luisa.fernandez@example.com",
// 	Artist: "Juanita",
// 	Day:    12
// 	Month:  "Mayo",
// }

// appList = append(appList, appPaola, appJorge, appDiego, appMaria, appPedro, appLuisa)
