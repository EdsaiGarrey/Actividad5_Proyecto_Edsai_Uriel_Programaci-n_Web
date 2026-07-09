# Actividad 5 - Proyecto Login y Sistema

## Portada

**Materia:** Programación Web  
**Proyecto:** Sistema Académico con login

**Docente:** Adelina Martinez Nieto 

**Integrantes:**  
- Edsai Alejandro García Reyes  
- Uriel Eduardo Guzman Ramirez  

**Tecnologías utilizadas:**  
HTML, CSS, JavaScript, Bootstrap y Local Storage.

---

## Descripción del proyecto

Este proyecto consiste en un sistema web con dos pantallas principales:

1. **login.html:** pantalla de inicio de sesión.
2. **index.html:** pantalla principal del sistema.

El usuario primero entra al login, escribe su correo y contraseña, y si los datos son válidos, el sistema lo manda a la pantalla principal. En el sistema se muestra el usuario en el navbar, se puede abrir el sidebar, capturar usuarios, registrar alumnos, validar número de control y mostrar un modal para saber si el alumno es mayor o menor de edad.

---

## Framework CSS utilizado

Se utilizó **Bootstrap 5** mediante CDN para mejorar el diseño y hacer que el sistema sea responsivo.

CDN de Bootstrap CSS:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
```

CDN de Bootstrap JS:

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

También se usaron estilos propios en:

```txt
css/login.css
css/styles.css
```


## Flujo del sistema

El flujo del proyecto es el siguiente:

```txt
login.html
↓
El usuario ingresa correo y contraseña
↓
JavaScript valida los datos
↓
Se guarda el usuario en Local Storage
↓
Se redirige a index.html
↓
El navbar muestra el usuario
↓
El usuario puede usar el sistema
↓
Al cerrar sesión regresa a login.html
```

---

## Funcionamiento del login

La pantalla `login.html` contiene un formulario con:

- Correo electrónico
- Contraseña

El archivo `login.js` valida los datos usando funciones de `utileria.js`.

Funciones utilizadas:

```javascript
validarCorreo(correo)
validarPassword(password)
```

Si el correo y la contraseña son correctos, se guarda el usuario con:

```javascript
localStorage.setItem("usuarioActivo", correo);
```

Después se redirige al sistema con:

```javascript
window.location.href = "index.html";
```

<img width="1029" height="606" alt="image" src="https://github.com/user-attachments/assets/f6a67103-47e2-4737-a6b2-c9f4d8ad5922" />


---

## Cómo se muestra el usuario en el navbar

Para mostrar el usuario en el navbar, se utilizó `localStorage`.

En el login se guarda el correo:

```javascript
localStorage.setItem("usuarioActivo", correo);
```

En `index.html`, el archivo `utileria.js` obtiene ese dato y lo coloca en el navbar:

```javascript
localStorage.getItem("usuarioActivo");
```

El usuario se muestra en este elemento:

```html
<span id="nombreUsuarioNavbar">Usuario</span>
```
<img width="1297" height="659" alt="image" src="https://github.com/user-attachments/assets/18b203a8-4c92-4b75-a5ee-7bf79c3ef048" />

---

## Navbar y cierre de sesión

En `index.html` se agregó una barra superior o navbar.

En la parte derecha aparece el usuario que inició sesión. Al dar clic sobre el usuario, se despliega una opción para salir del sistema.

Al cerrar sesión se elimina el usuario guardado:

```javascript
localStorage.removeItem("usuarioActivo");
```

Y se regresa al login:

```javascript
window.location.href = "login.html";
```
<img width="487" height="281" alt="image" src="https://github.com/user-attachments/assets/861b9c5f-b5b5-4bc5-b58c-a75c3915aa0c" />


## Sidebar

El sistema incluye un sidebar o menú lateral con botón hamburguesa.

El menú tiene la opción:

```txt
Usuarios
```

Y dentro de ella un submenú:

```txt
Captura
```

Desde esta opción se puede acceder al formulario de captura de usuarios.
<img width="651" height="635" alt="image" src="https://github.com/user-attachments/assets/15d7a8f7-28a9-4297-9a3c-e6c225687f2a" />


## Métodos principales

### validarCorreo()

Valida que el correo tenga un formato correcto.

### validarPassword()

Valida que la contraseña cumpla con los requisitos establecidos.

### validarNumeroControl()

Valida que el número de control tenga 6 dígitos.

### mostrarUsuarioEnNavbar()

Muestra el usuario activo en el navbar.

### cerrarSesion()

Elimina el usuario guardado y regresa al login.

### configurarSidebar()

Controla la apertura del sidebar y el submenú de usuarios.

### mostrarModalEdad()

Muestra el modal indicando si el alumno es mayor o menor de edad.

## Participación del equipo

### Edsai Alejandro García Reyes

Realizó la parte del sistema principal:

- `index.html`
- Sidebar
- Navbar con usuario
- Dropdown de salida
- Formulario de usuarios
- Validación del número de control
- Modal de edad
- Parte de `utileria.js`

### Uriel Eduardo Guzman Ramirez

Realizó la parte del login:

- `login.html`
- `login.css`
- `login.js`
- Validación de correo y contraseña
- Guardado del usuario en Local Storage
- Redirección hacia `index.html`

## Conclusión

Con este proyecto se aplicaron conocimientos de HTML, CSS, JavaScript, Bootstrap, Local Storage. El sistema permite simular un inicio de sesión, mostrar el usuario dentro del sistema, validar formularios y cerrar sesión correctamente.

