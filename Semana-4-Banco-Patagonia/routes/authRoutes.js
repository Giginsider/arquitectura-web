const express = require('express');
const jwt = require('jsonwebtoken');
const users = require('../data/users');

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
    httpOnly: true
  });

  res.json({
    message: "Login exitoso"
  });
});

// LOGOUT
router.post('/logout', (req, res) => {
  res.clearCookie('token');

  res.json({
    message: "Sesión cerrada"
  });
});

module.exports = router;