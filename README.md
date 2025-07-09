# 🧠 Funko Pop! SCRAPER

Proyecto creado para hacer web scraping en la página oficial de Funko, extrayendo únicamente los clásicos Funko Pop!, obteniendo:

- Nombre del producto
- Imagen
- Precio


### 🚀 FUNCIONALIDADES

- 🔎 Buscar por categorías (Videogames, Retro Toys, Music... etc.)
- 🔍 Usar un buscador libre (por personaje o palabra clave)
- 💾 Guardar los resultados en MongoDB (sobrescribiendo cada nueva búsqueda)
- 🗃️ Generar un archivo JSON por cada búsqueda


### ⚙️ TECNOLOGÍAS USADAS

- 🟨 Node.js + Express
- 🌐 Puppeteer (Web scraping)
- 💾 MongoDB (Mongoose)
- 🧪 Insomnia (testing de endpoints)
- 🖼️ Vanilla JS (frontend)


---

### 📁 ESTRUCTURA DE DATOS

Cada producto scrapeado tiene el siguiente formato:
```json

{
  "title": "Pop! Avril Lavigne (Sk8ter Boi)",
  "price": "14.99€",
  "img": "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw47e3b3e3/images/funko/upload/75384_AvrilLavigne_Sk8erBoi_POP_GLAM-WEB.png?sw=346&sh=346"
}
```


---

### ❓ NOTAS IMPORTANTES

⚠️ No ha sido posible generar resultados aleatorios, debido a cómo está estructurada la web original de Funko (requiere parámetros start y sz por paginación).

🔄 Los datos se sobreescriben en cada nueva búsqueda tanto en MongoDB como en el archivo JSON correspondiente. 

Para guardar los JSON en la carpeta correcta:
- fs.writeFile('../${topic}.json') -> lo guarda fuera del proyecto.
- fs.writeFile('${topic}.json') -> guarda en la raíz del proyecto (recomendado si trabajas desde VSCode)

--

### 🔬 TESTING DE ENDPOINTS (INSOMNIA)

🧠 ** TODOS LOS FUNKOS POR BÚSQUEDA ** Ejemplo Método: GET 
   ** URL: ** `http://localhost:4001/api/v1/funko/disney?page=2`

🧠 ** FUNKOS POR CATEGORÍA DESTACADA ** Ejemplo Método: GET 
   ** URL: ** `http://localhost:4001/api/v1/cat/music`



🖼️ Previsualizacion de la página
![preview](/front/pics/cap1.png)

🌀 Spinners de carga
![spinner](/front/pics/spinner.png)

📄 Paginación
![paginacion](/front/pics/paginacion.png)

