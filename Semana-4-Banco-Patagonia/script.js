const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const mensaje = document.getElementById("mensaje");

    // Buscar si algún usuario coincide con usuario y contraseña
    const usuarioEncontrado = users.find(function(u) {
        return u.username === username && u.password === password;
    });

    if (usuarioEncontrado) {
        // Guardar datos del usuario en sessionStorage para usarlos en cuenta.html
        sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));
        window.location.href = "login.html";
    } else {
        mensaje.style.color = "red";
        mensaje.innerText = "Usuario o contraseña incorrectos.";
    }
});
