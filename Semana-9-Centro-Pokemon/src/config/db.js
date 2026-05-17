// Configuración de la conexión al Centro Pokémon
// Usamos un POOL de conexiones: es más eficiente que abrir
// y cerrar una conexión por cada petición HTTP.
const mysql = require('mysql2');
require('dotenv').config();
 
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
 
// Exportamos la versión "promise" para usar async/await,
// que se lee mucho más limpio que los callbacks.
module.exports = pool.promise();
