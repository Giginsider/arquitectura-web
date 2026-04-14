const express     = require('express');
const router      = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const users       = require('../data/users');

router.get('/mi-cuenta', verifyToken, (req, res) => {
  // req.user contiene el payload del JWT: { id, username }
  // Buscamos el usuario completo en la lista para devolver nombre, cuenta y saldo
  const user = users.find(u => u.id === req.user.id);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  res.json({
    mensaje: "Acceso permitido",
    usuario: {
      nombre: user.nombre,
      cuenta: user.cuenta,
      saldo:  user.saldo
    }
  });
});

module.exports = router;
