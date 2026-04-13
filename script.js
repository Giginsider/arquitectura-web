const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const mensaje = document.getElementById("mensaje");

    // 🔥 LOGIN SIMULADO
    if (username === "Fernando Pérez" && password === "1234") {
        mensaje.style.color = "green";
        mensaje.innerText = "Acceso permitido";

        // Guardar usuario
        localStorage.setItem("usuario", username);

        // Redirigir
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);

    } else {
        mensaje.style.color = "red";
        mensaje.innerText = "Usuario o contraseña incorrectos";
    }
});