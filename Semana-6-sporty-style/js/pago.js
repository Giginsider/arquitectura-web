document.getElementById("form-pago").addEventListener("submit", (e) => {
    e.preventDefault();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const error = document.getElementById("error");
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexTelefono = /^\d{9}$/;
   
    if (!regexCorreo.test(correo)) {
      error.innerText = "El correo debe tener formato usuario@dominio.com";
      return;
    }
    if (!regexTelefono.test(telefono)) {
      error.innerText = "El teléfono debe tener exactamente 9 dígitos.";
      return;
    }
   
    // Si todo está bien, vamos a la pantalla de gracias
    window.location.href = "gracias.html";
  });
  