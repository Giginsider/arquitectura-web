// server.js - Servidor principal del Banco Patagonia
const express      = require('express');
const cookieParser = require('cookie-parser');
const authRoutes   = require('./routes/authRoutes');
const privateRoutes = require('./routes/privateRoutes');

const app  = express();
const PORT = 3000;

// ── Middlewares globales ──────────────────────────────────────────
app.use(express.json());        // Parsea body JSON de las peticiones
app.use(cookieParser());        // Habilita lectura de cookies

// ── Rutas de la API ───────────────────────────────────────────────
app.use('/api/auth', authRoutes);      // Login y logout
app.use('/api',      privateRoutes);   // Rutas protegidas

// ── Archivos estáticos (HTML, CSS, imágenes, JS del frontend) ─────
// Express busca el archivo pedido dentro de la carpeta del proyecto.
// Si alguien entra a "/" sin especificar archivo, sirve login.html.
app.use(express.static('.', { index: 'login.html' }));

// ── Iniciar servidor ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Banco Patagonia corriendo en http://localhost:${PORT}`);
});
