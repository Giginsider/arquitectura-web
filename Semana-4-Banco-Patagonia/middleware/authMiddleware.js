const jwt = require('jsonwebtoken');
const blacklist = require('../data/tokenBlacklist');

const SECRET = 'clave_secreta';

function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Acceso denegado. Debes iniciar sesión"
    });
  }

  // Si el token fue invalidado por un logout previo, lo rechazamos
  if (blacklist.has(token)) {
    return res.status(401).json({
      message: "Token inválido. La sesión fue cerrada."
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido"
    });
  }
}

module.exports = verifyToken;
