// ===============================
// FUNCIONES DE VALIDACIÓN
// ===============================

// Valida que el correo tenga un formato correcto.
// Ejemplo válido: usuario@correo.com
const validarCorreo = (correo) => {
    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionCorreo.test(correo);
};

// Valida que la contraseña tenga mínimo 6 caracteres.
// Esta validación es sencilla porque el login es simulado.
const validarPassword = (password) => {
    return password.length >= 6;
};

// Valida que el número de control tenga exactamente 6 dígitos.
// Solo acepta números, no letras.
const validarNumeroControl = (numeroControl) => {
    const expresionNumeroControl = /^\d{6}$/;
    return expresionNumeroControl.test(numeroControl);
};

// ===============================
// FUNCIONES DEL SISTEMA
// ===============================

// Obtiene el usuario guardado desde login.html.
// Uri debe guardar el usuario en localStorage con la clave "usuarioActivo".
const obtenerUsuarioActivo = () => {
    return localStorage.getItem("usuarioActivo");
};

// Muestra el usuario en la parte derecha del navbar.
const mostrarUsuarioEnNavbar = () => {
    const usuario = obtenerUsuarioActivo();
    const nombreUsuarioNavbar = document.getElementById("nombreUsuarioNavbar");

    if (usuario) {
        nombreUsuarioNavbar.textContent = usuario;
    } else {
        // Si no hay usuario activo, se regresa al login.
        window.location.href = "login.html";
    }
};

// Cierra la sesión simulada.
// Elimina el usuario guardado y regresa al login.
const cerrarSesion = () => {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "login.html";
};

// ===============================
// SIDEBAR Y MENÚ
// ===============================

// Abre o cierra el sidebar lateral.
const configurarSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    const btnAbrirSidebar = document.getElementById("btnAbrirSidebar");
    const btnCerrarSidebar = document.getElementById("btnCerrarSidebar");
    const btnUsuarios = document.getElementById("btnUsuarios");
    const submenuUsuarios = document.getElementById("submenuUsuarios");

    btnAbrirSidebar.addEventListener("click", () => {
        sidebar.classList.add("activo");
    });

    btnCerrarSidebar.addEventListener("click", () => {
        sidebar.classList.remove("activo");
    });

    btnUsuarios.addEventListener("click", () => {
        submenuUsuarios.classList.toggle("activo");
    });
};

// ===============================
// FORMULARIO DE USUARIOS
// ===============================

// Configura el formulario de captura de usuarios.
// Valida nombre, correo y contraseña.
const configurarFormularioUsuario = () => {
    const formUsuario = document.getElementById("formUsuario");

    formUsuario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nombre = document.getElementById("nombreUsuario").value.trim();
        const correo = document.getElementById("correoUsuario").value.trim();
        const password = document.getElementById("passwordUsuario").value.trim();

        if (nombre === "") {
            alert("Debes escribir el nombre del usuario.");
            return;
        }

        if (!validarCorreo(correo)) {
            alert("El correo electrónico no tiene un formato válido.");
            return;
        }

        if (!validarPassword(password)) {
            alert("La contraseña debe tener mínimo 6 caracteres.");
            return;
        }

        alert("Usuario guardado correctamente.");

        formUsuario.reset();
    });
};

// ===============================
// FORMULARIO DE ALUMNOS
// ===============================

// Configura el formulario de alumnos.
// Valida número de control y edad.
const configurarFormularioAlumno = () => {
    const formAlumno = document.getElementById("formAlumno");

    formAlumno.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nombreAlumno = document.getElementById("nombreAlumno").value.trim();
        const numeroControl = document.getElementById("numeroControl").value.trim();
        const edad = parseInt(document.getElementById("edadAlumno").value);

        if (nombreAlumno === "") {
            alert("Debes escribir el nombre del alumno.");
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
};

// ===============================
// MODAL DE EDAD
// ===============================

// Muestra un modal indicando si el alumno es mayor o menor de edad.
const mostrarModalEdad = (nombreAlumno, edad) => {
    const modalEdad = new bootstrap.Modal(document.getElementById("modalEdad"));
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
};

// ===============================
// CARGA INICIAL
// ===============================

// Cuando la página carga, se ejecutan todas las funciones principales.
document.addEventListener("DOMContentLoaded", () => {
    mostrarUsuarioEnNavbar();
    configurarSidebar();
    configurarFormularioUsuario();
    configurarFormularioAlumno();

    const btnSalir = document.getElementById("btnSalir");

    btnSalir.addEventListener("click", () => {
        cerrarSesion();
    });
});