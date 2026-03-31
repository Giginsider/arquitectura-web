// script
const formulario = document.getElementById('formularioContacto');
const mensajeEstado = document.getElementById('mensajeEstado');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    validarFormuario();
});

function validarFormuario() {
    // captura datos
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    // validacion simple
    // if (nombre === "" || email === "") {
    if (!formulario.checkValidity()) {
        mensajeEstado.innerText = "Error: Todos los campos son obligatorios";
        mensajeEstado.style.color = "red";
    } else {
        // notacion objetos JSON
        const datosFormualario = {
            nombre: nombre,
            email: email,
            fecha: new Date().toISOString()
        };

        console.log("Datos Capturados (JSON):", datosFormualario);

        //simulacion de promesa
        enviarDatos(datosFormualario)
            .then((respuesta) => {
                mensajeEstado.innerText = respuesta;
                mensajeEstado.style.color = "green";
            }).catch((error) => {
                mensajeEstado.innerText = error;
                mensajeEstado.style.color = "red";
            });
    }

}

function enviarDatos(datos) {
    return new Promise((resolve, reject) => {
        mensajeEstado.innerText = "Enviando datos...";

        setTimeout(() => {
            // simulacion de exito
            if (datos.nombre) {
                resolve("El formulario ha sido enviado exitosamente");
            } else {
                reject("Hubo un error al procesar el envio.");
            }
        }, 2000); // retrasode dos segundos para simular sincronia
    });
}
