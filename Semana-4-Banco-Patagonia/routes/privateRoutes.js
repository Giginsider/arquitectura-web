const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/authMiddleware');

router.get('/mi-cuenta', verifyToken, (req, res) => {
  res.json({
    mensaje: "Acceso permitido",
    usuario: req.user
  });
});

module.exports = router;