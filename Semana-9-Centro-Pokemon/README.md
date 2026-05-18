# 🏥 Centro Pokémon API
 
API REST desarrollada con Node.js, Express y MySQL para la gestión
de entrenadores (clientes) que registran a sus Pokémon en la clínica
del Centro Pokémon.
 
## Tecnologías
- Node.js + Express
- MySQL (mysql2)
- dotenv
 
## Instalación
 ```
git clone https://github.com/Giginsider/arquitectura-web.git
cd arquitectura-web/Semana-9-Centro-Pokemon
npm install
 ```
 
## Configuración
Crea un archivo .env en la raíz con:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=centro_pokemon
DB_PORT=3306
PORT=3000
 ```
Luego ejecuta el script SQL database.sql en tu MySQL.
 
## Ejecución
npm start
 
El servidor queda en http://localhost:3000
 
## Endpoints
 
| Método | Ruta              | Descripción     |
|--------|-------------------|-----------------|
| GET    | /api/clientes     | Lista todos     |
| GET    | /api/clientes/:id | Obtiene uno     |
| POST   | /api/clientes     | Crea uno        |
| PUT    | /api/clientes/:id | Actualiza       |
| DELETE | /api/clientes/:id | Elimina         |
 
## Pruebas
```
Importa el archivo Centro_pokemon.postman_collection.json en Postman.
Importa el archivo local.postman_environment.json en Postman.
```