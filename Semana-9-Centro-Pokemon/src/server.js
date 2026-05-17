const express = require('express');
require('dotenv').config();
const clienteRoutes = require('./routes/clienteRoutes');
 
const app = express();
const PORT = process.env.PORT || 3000;
 
// Middleware para leer JSON en el body de las peticiones
app.use(express.json());
 
// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({ mensaje: '¡Bienvenido al Centro Pokémon API!' });
});
 
// Montamos las rutas de clientes
app.use('/api/clientes', clienteRoutes);
 
// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ ok: false, mensaje: 'Ruta no encontrada' });
});
 
app.listen(PORT, () => {
  console.log(`🏥 Centro Pokémon escuchando en http://localhost:${PORT}`);
});
