const jwt = require('jsonwebtoken');

const SECRET = 'clave_secreta';

function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Acceso denegado. Debes iniciar sesión"
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