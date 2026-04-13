const form = document.getElementById("loginForm");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const mensaje  = document.getElementById("mensaje");

    // Enviamos las credenciales al servidor. El servidor valida, genera el JWT
    // y lo guarda como cookie httpOnly (el navegador la recibe automáticamente).
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        // Login exitoso: el servidor ya guardó el JWT en la cookie.
        // Redirigimos al dashboard, que verificará la sesión con el servidor.
        window.location.href = "index.html";
    } else {
        const data = await response.json();
        mensaje.style.color = "red";
        mensaje.innerText = data.message || "Error al iniciar sesión";
    }
});
