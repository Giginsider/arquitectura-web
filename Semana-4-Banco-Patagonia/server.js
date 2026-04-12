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

// ── Rutas ─────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);      // Login y logout
app.use('/api',      privateRoutes);   // Rutas protegidas

// ── Ruta raiz (pagina de bienvenida del banco) ────────────────────
app.get('/', (req, res) => {
  res.json({
    banco:   "Banco Patagonia",
    mensaje: "Bienvenido al portal digital seguro.",
    login:   "POST /api/auth/login"
  });
});

// ── Iniciar servidor ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Banco Patagonia corriendo en http://localhost:${PORT}`);
});
