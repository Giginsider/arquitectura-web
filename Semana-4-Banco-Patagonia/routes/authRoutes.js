const express  = require('express');
const jwt      = require('jsonwebtoken');
const users    = require('../data/users');
const blacklist = require('../data/tokenBlacklist');

const router = express.Router();

const JWT_SECRET = 'clave_secreta';

// LOGIN
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Debe ingresar usuario y contraseña"
    });
  }

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Credenciales incorrectas. No autorizado."
    });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.cookie('token', token, {
    httpOnly: true  // El navegador no puede leer la cookie con JavaScript (más seguro)
  });

  res.json({
    message: "Login exitoso",
    token   // Devolvemos el token en el body también para poder inspeccionarlo fácilmente
  });
});

// LOGOUT
router.post('/logout', (req, res) => {
  const token = req.cookies.token;

  // Si hay un token activo, lo agregamos a la lista negra para que
  // el servidor lo rechace aunque alguien intente reutilizarlo
  if (token) {
    blacklist.add(token);
  }

  res.clearCookie('token');

  res.json({
    message: "Sesión cerrada. El token fue invalidado."
  });
});

module.exports = router;
