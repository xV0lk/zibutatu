// Code generated by running "go generate" in golang.org/x/text. DO NOT EDIT.

package translations

import (
	"golang.org/x/text/language"
	"golang.org/x/text/message"
	"golang.org/x/text/message/catalog"
)

type dictionary struct {
	index []uint32
	data  string
}

func (d *dictionary) Lookup(key string) (data string, ok bool) {
	p, ok := messageKeyToIndex[key]
	if !ok {
		return "", false
	}
	start, end := d.index[p], d.index[p+1]
	if start == end {
		return "", false
	}
	return d.data[start:end], true
}

func init() {
	dict := map[string]catalog.Dictionary{
		"en_US": &dictionary{index: en_USIndex, data: en_USData},
		"es_CO": &dictionary{index: es_COIndex, data: es_COData},
	}
	fallback := language.MustParse("es-CO")
	cat, err := catalog.NewFromMap(dict, catalog.Fallback(fallback))
	if err != nil {
		panic(err)
	}
	message.DefaultCatalog = cat
}

var messageKeyToIndex = map[string]int{
	"Agregar Tarea":                    18,
	"Cambiar idioma":                   14,
	"Contraseña":                       12,
	"Contraseña incorrecta":            2,
	"Email":                            10,
	"Email ya se encuentra registrado": 3,
	"Español":                          15,
	"Id no valido":                     6,
	"Ingles":                           16,
	"Iniciar Sesión":                   11,
	"Nombre no puede estar vacío":      5,
	"Ocurrió un error":                 0,
	"Olvidaste tu contraseña?":         22,
	"Recuperar":                        24,
	"Recuperar Contraseña":             23,
	"Salir":                            17,
	"Se han enviado las instrucciones para cambiar la contraseña a tu correo": 21,
	"Status no valido":                7,
	"Tarea Agregada exitosamente.":    4,
	"Tarea actualizada exitosamente.": 8,
	"Tareas completadas: %d":          20,
	"Tareas totales: %d":              19,
	"Usuario no encontrado":           1,
	"Ver":                             13,
	"Welcome!\n":                      9,
}

var en_USIndex = []uint32{ // 26 elements
	0x00000000, 0x00000012, 0x00000021, 0x00000030,
	0x00000049, 0x00000062, 0x00000077, 0x00000082,
	0x00000091, 0x000000ac, 0x000000ba, 0x000000c0,
	0x000000c7, 0x000000d0, 0x000000d5, 0x000000e5,
	0x000000ed, 0x000000f5, 0x000000fa, 0x00000103,
	0x00000116, 0x0000012d, 0x0000012d, 0x0000012d,
	0x0000012d, 0x0000012d,
} // Size: 128 bytes

const en_USData string = "" + // Size: 301 bytes
	"\x02An error occurred\x02User not found\x02Wrong password\x02Email alrea" +
	"dy registered\x02Task added successfully.\x02Name cannot be empty\x02Inv" +
	"alid Id\x02Invalid Status\x02Task updated successfully.\x04\x00\x01\x0a" +
	"\x09\x02Welcome!\x02Email\x02Log in\x02Password\x02View\x02Change langua" +
	"ge\x02Spanish\x02English\x02Exit\x02Add task\x02Total tasks: %[1]d\x02Co" +
	"mpleted tasks: %[1]d"

var es_COIndex = []uint32{ // 26 elements
	0x00000000, 0x00000012, 0x00000028, 0x0000003f,
	0x00000060, 0x0000007d, 0x0000009a, 0x000000a7,
	0x000000b8, 0x000000d8, 0x000000e9, 0x000000ef,
	0x000000ff, 0x0000010b, 0x0000010f, 0x0000011e,
	0x00000127, 0x0000012e, 0x00000134, 0x00000142,
	0x00000158, 0x00000172, 0x000001bb, 0x000001d5,
	0x000001eb, 0x000001f5,
} // Size: 128 bytes

const es_COData string = "" + // Size: 501 bytes
	"\x02Ocurrió un error\x02Usuario no encontrado\x02Contraseña incorrecta" +
	"\x02Email ya se encuentra registrado\x02Tarea Agregada exitosamente.\x02" +
	"Nombre no puede estar vacío\x02Id no valido\x02Status no valido\x02Tarea" +
	" actualizada exitosamente.\x04\x00\x01\x0a\x0c\x02Bienvenido!\x02Email" +
	"\x02Iniciar Sesión\x02Contraseña\x02Ver\x02Cambiar idioma\x02Español\x02" +
	"Ingles\x02Salir\x02Agregar Tarea\x02Tareas totales: %[1]d\x02Tareas comp" +
	"letadas: %[1]d\x02Se han enviado las instrucciones para cambiar la contr" +
	"aseña a tu correo\x02Olvidaste tu contraseña?\x02Recuperar Contraseña" +
	"\x02Recuperar"

	// Total table size 1058 bytes (1KiB); checksum: 10048307
