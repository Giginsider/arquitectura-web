// Obtener usuario guardado desde login
const usuario = localStorage.getItem("usuario");

// Si no hay usuario → volver al login (seguridad)
if (!usuario) {
    window.location.href = "index.html";
}

// Mostrar nombre
document.getElementById("nombreUsuario").innerText = usuario;

// 🔥 Datos simulados (tipo banco)
const datos = {
    cuenta: "458923458891",
    saldo: 1250000
};

// Mostrar datos
document.getElementById("cuenta").innerText = datos.cuenta;
document.getElementById("saldo").innerText = datos.saldo.toLocaleString();

// Cerrar sesión
function logout() {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
}