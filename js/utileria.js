// ======================================================
// Librería de utilidades para validaciones
// Archivo: utileria.js
// Proyecto: Actividad 5 - Proyecto Login y Sistema
// ======================================================


// Valida que el correo tenga un formato correcto.
// Ejemplo válido: usuario@correo.com
function validarCorreo(correo) {
    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionCorreo.test(correo);
}


// Valida que el texto contenga solo letras y espacios.
// Se usa para nombres de usuarios o alumnos.
function soloLetras(texto) {
    const expresionLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return expresionLetras.test(texto);
}


// Valida que un dato tenga una longitud exacta.
// Ejemplo: validarLongitud("123456", 6)
function validarLongitud(numero, maxLongitud) {
    return numero.length === maxLongitud;
}


// Calcula la edad con base en una fecha de nacimiento.
function calcularEdad(fechaNacimiento) {
    const fechaActual = new Date();
    const fechaNac = new Date(fechaNacimiento);

    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();

    const mes = fechaActual.getMonth() - fechaNac.getMonth();

    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNac.getDate())) {
        edad--;
    }

    return edad;
}


// Valida si una persona es mayor de edad usando fecha de nacimiento.
function esMayorDeEdad(fechaNacimiento) {
    return calcularEdad(fechaNacimiento) >= 18;
}


// Valida contraseña.
// Reglas:
// - Mínimo 8 caracteres
// - Al menos una letra mayúscula
// - Al menos un número
function validarPassword(password) {
    const tieneLongitud = password.length >= 8;
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);

    return tieneLongitud && tieneMayuscula && tieneNumero;
}


// Valida que el número de control tenga exactamente 6 dígitos numéricos.
function validarNumeroControl(numeroControl) {
    const expresionNumeroControl = /^\d{6}$/;
    return expresionNumeroControl.test(numeroControl);
}


// ======================================================
// Funciones del sistema principal index.html
// ======================================================


// Obtiene el usuario guardado desde login.html.
// Uri debe guardar el usuario en localStorage con la clave "usuarioActivo".
function obtenerUsuarioActivo() {
    return localStorage.getItem("usuarioActivo");
}


// Muestra el usuario en la parte derecha del navbar.
function mostrarUsuarioEnNavbar() {
    const usuario = obtenerUsuarioActivo();
    const nombreUsuarioNavbar = document.getElementById("nombreUsuarioNavbar");

    // Si este elemento no existe, significa que no estamos en index.html.
    if (!nombreUsuarioNavbar) {
        return;
    }

    if (usuario) {
        nombreUsuarioNavbar.textContent = usuario;
    } else {
        window.location.href = "login.html";
    }
}


// Cierra la sesión simulada.
function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "login.html";
}


// Configura el sidebar lateral y el submenú de usuarios.
function configurarSidebar() {
    const sidebar = document.getElementById("sidebar");
    const btnAbrirSidebar = document.getElementById("btnAbrirSidebar");
    const btnCerrarSidebar = document.getElementById("btnCerrarSidebar");
    const btnUsuarios = document.getElementById("btnUsuarios");
    const submenuUsuarios = document.getElementById("submenuUsuarios");

    if (!sidebar || !btnAbrirSidebar || !btnCerrarSidebar || !btnUsuarios || !submenuUsuarios) {
        return;
    }

    btnAbrirSidebar.addEventListener("click", () => {
        sidebar.classList.add("activo");
    });

    btnCerrarSidebar.addEventListener("click", () => {
        sidebar.classList.remove("activo");
    });

    btnUsuarios.addEventListener("click", () => {
        submenuUsuarios.classList.toggle("activo");
    });
}


// Configura el formulario de captura de usuarios.
function configurarFormularioUsuario() {
    const formUsuario = document.getElementById("formUsuario");

    if (!formUsuario) {
        return;
    }

    formUsuario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nombre = document.getElementById("nombreUsuario").value.trim();
        const correo = document.getElementById("correoUsuario").value.trim();
        const password = document.getElementById("passwordUsuario").value.trim();

        if (nombre === "") {
            alert("Debes escribir el nombre del usuario.");
            return;
        }

        if (!soloLetras(nombre)) {
            alert("El nombre solo debe contener letras y espacios.");
            return;
        }

        if (!validarCorreo(correo)) {
            alert("El correo electrónico no tiene un formato válido.");
            return;
        }

        if (!validarPassword(password)) {
            alert("La contraseña debe tener mínimo 8 caracteres, una mayúscula y un número.");
            return;
        }

        alert("Usuario guardado correctamente.");
        formUsuario.reset();
    });
}


// Configura el formulario de alumnos.
function configurarFormularioAlumno() {
    const formAlumno = document.getElementById("formAlumno");

    if (!formAlumno) {
        return;
    }

    formAlumno.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nombreAlumno = document.getElementById("nombreAlumno").value.trim();
        const numeroControl = document.getElementById("numeroControl").value.trim();
        const edad = parseInt(document.getElementById("edadAlumno").value);

        if (nombreAlumno === "") {
            alert("Debes escribir el nombre del alumno.");
            return;
        }

        if (!soloLetras(nombreAlumno)) {
            alert("El nombre del alumno solo debe contener letras y espacios.");
            return;
        }

        if (!validarNumeroControl(numeroControl)) {
            alert("El número de control debe tener exactamente 6 dígitos numéricos.");
            return;
        }

        if (isNaN(edad) || edad <= 0) {
            alert("Debes escribir una edad válida.");
            return;
        }

        mostrarModalEdad(nombreAlumno, edad);
        formAlumno.reset();
    });
}


// Muestra un modal indicando si el alumno es mayor o menor de edad.
function mostrarModalEdad(nombreAlumno, edad) {
    const modalElemento = document.getElementById("modalEdad");

    if (!modalElemento) {
        return;
    }

    const modalEdad = new bootstrap.Modal(modalElemento);
    const modalHeader = document.getElementById("modalHeader");
    const tituloModalEdad = document.getElementById("tituloModalEdad");
    const mensajeModalEdad = document.getElementById("mensajeModalEdad");

    modalHeader.classList.remove("mayor", "menor");

    if (edad >= 18) {
        tituloModalEdad.textContent = "Mayor de edad";
        mensajeModalEdad.textContent = `${nombreAlumno} tiene ${edad} años, por lo tanto es mayor de edad.`;
        modalHeader.classList.add("mayor");
    } else {
        tituloModalEdad.textContent = "Menor de edad";
        mensajeModalEdad.textContent = `${nombreAlumno} tiene ${edad} años, por lo tanto es menor de edad.`;
        modalHeader.classList.add("menor");
    }

    modalEdad.show();
}


// ======================================================
// Carga inicial del sistema
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
    mostrarUsuarioEnNavbar();
    configurarSidebar();
    configurarFormularioUsuario();
    configurarFormularioAlumno();

    const btnSalir = document.getElementById("btnSalir");

    if (btnSalir) {
        btnSalir.addEventListener("click", () => {
            cerrarSesion();
        });
    }
});