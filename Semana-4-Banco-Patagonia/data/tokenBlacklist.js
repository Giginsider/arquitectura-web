// data/tokenBlacklist.js
// Lista negra de tokens invalidados por el servidor.
//
// ¿Por qué hace falta esto?
// Los JWT son "stateless": el servidor no guarda ningún registro de qué tokens
// emitió. Por eso, borrar la cookie del cliente no alcanza para invalidar el
// token — alguien que lo haya guardado antes del logout podría seguir usándolo.
//
// Solución: cuando el usuario hace logout, el servidor guarda el token en este
// Set. El middleware de autenticación revisa esta lista antes de aceptar
// cualquier token, y rechaza los que ya fueron invalidados.
//
// Nota: al ser in-memory, la lista se borra si el servidor se reinicia.
// Para producción real se usaría Redis u otra base de datos.

const blacklist = new Set();

module.exports = blacklist;
