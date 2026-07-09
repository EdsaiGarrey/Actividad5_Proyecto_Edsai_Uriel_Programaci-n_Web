// Se obtiene el formulario del login
const formLogin = document.getElementById("formLogin");
const mensajeError = document.getElementById("mensajeError");

// Evento para validar el formulario al enviarlo
formLogin.addEventListener("submit", function(event) {
    event.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();

    // Ocultar mensaje anterior
    mensajeError.classList.add("d-none");
    mensajeError.textContent = "";

    // Validar campos vacíos
    if (correo === "" || password === "") {
        mostrarError("Todos los campos son obligatorios.");
        return;
    }

    // Validar correo usando utileria.js
    if (!validarCorreo(correo)) {
        mostrarError("El correo electrónico no tiene un formato válido.");
        return;
    }

    // Validar contraseña usando utileria.js
    if (!validarPassword(password)) {
        mostrarError("La contraseña debe tener mínimo 8 caracteres, una mayúscula y un número.");
        return;
    }

    // Simulación de inicio de sesión
    localStorage.setItem("usuarioActivo", correo);

    // Redirección a la pantalla principal del sistema
    window.location.href = "index.html";
});

// Función para mostrar errores en pantalla
function mostrarError(mensaje) {
    mensajeError.textContent = mensaje;
    mensajeError.classList.remove("d-none");
}