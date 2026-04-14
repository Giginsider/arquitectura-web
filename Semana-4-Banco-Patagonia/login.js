<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi Cuenta - Banco Patagonia</title>
    <link rel="stylesheet" href="css/style.css">
    <style>
        .cuenta-container {
            background: white;
            padding: 40px 30px;
            border-radius: 12px;
            width: 360px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        .bienvenida {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
        }
        .dato {
            margin: 10px 0;
            font-size: 15px;
            color: #444;
        }
        .dato span {
            font-weight: bold;
            color: #003366;
        }
        .saldo {
            margin-top: 20px;
            font-size: 22px;
            color: #003366;
            font-weight: bold;
        }
        .btn-salir {
            margin-top: 25px;
            width: 100%;
            padding: 12px;
            background: #003366;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 15px;
            cursor: pointer;
        }
        .btn-salir:hover {
            background: #0055aa;
        }
    </style>
</head>
<body>
    <div class="cuenta-container">
        <img src="Public/1115389.png" style="width: 50px; height: 50px;"/>
        <div class="logo">Banco Patagonia</div>
        <h2>Mi cuenta</h2>

        <p class="bienvenida">Bienvenido/a, <span id="nombre"></span></p>
        <p class="dato">Número de cuenta: <span id="cuenta"></span></p>
        <p class="saldo">Saldo disponible: $<span id="saldo"></span></p>

        <button class="btn-salir" onclick="cerrarSesion()">Cerrar sesión</button>
    </div>

    <script>
        const usuario = JSON.parse(sessionStorage.getItem("usuarioLogueado"));

        // Si no hay sesión activa, volver al login
        if (!usuario) {
            window.location.href = "index.html";
        } else {
            document.getElementById("nombre").innerText = usuario.nombre;
            document.getElementById("cuenta").innerText = usuario.cuenta;
            document.getElementById("saldo").innerText = usuario.saldo.toLocaleString("es-AR");
        }

        function cerrarSesion() {
            sessionStorage.removeItem("usuarioLogueado");
            window.location.href = "index.html";
        }
    </script>
</body>
</html>
