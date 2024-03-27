# PROYECTO 9 WEB SCRAPPING FUNKOS -

Proyecto creado para hacer web scrapping en la página oficial de Funko, para extraer sólo los clásicos Funko Pop! con nombre, foto y precio.

Puedes buscar por categoría o por el propio buscador en caso de buscar un personaje concreto.

Los datos se guardan en la base de datos de MongoDB, pero se sobreescriben en cada nueva búsqueda, generándose un archivo json.

No he podido generar aleatoriedad en la aparición de los productos, intuyo que es por cómo están dispuestos en la web original.

Me ocurre algo muy extraño con fs.write(), y es que asi: ../${topic}.json, me guarda el archivo, pero no en vscode, sino fuera. Como archivo externo. Si lo hago así: ${topic}.json, se me guarda en vscode, también por categoría, pero NO ME PINTA LOS PRODUCTOS.

Le he dado millones de vueltas, y no doy con lo que pasa.

En insomnia:

## traerse todos los funkos

- **Método:** GET
- **URL:** `http://localhost:4001/api/v1/funko/`

## traerse un funko por categoría

- **Método:** GET
- **URL:** `http://localhost:4001/api/v1/cat/`

![captura a Insomnia](/front/pics/foto1.png)

Pruebas en el front
![captura a Insomnia](/front/pics/foto2.png)

Spinner
![spinner](/front/pics/spinner.png)