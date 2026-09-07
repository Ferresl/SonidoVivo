let regionesComunas = {

    "Metropolitana": ["Santiago", "Quilicura", "Providencia", "Maipú"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"],
    "Biobío": ["Concepción", "Talcahuano", "Los Ángeles"]

};

function cargarRegionesRegistro() {

    let selectRegion = document.getElementById("regRegion");

    selectRegion.innerHTML = `<option value="">Seleccione región</option>`;

    for (let region in regionesComunas) {
        selectRegion.innerHTML += `<option value="${region}">${region}</option>`;
    }

}

function actualizarComunasRegistro() {

    let region = document.getElementById("regRegion").value;
    let selectComuna = document.getElementById("regComuna");

    selectComuna.innerHTML = `<option value="">Seleccione comuna</option>`;

    if (region === "") {
        return;
    }

    let comunas = regionesComunas[region];

    for (let i = 0; i < comunas.length; i++) {
        selectComuna.innerHTML += `<option value="${comunas[i]}">${comunas[i]}</option>`;
    }

}

cargarRegionesRegistro();

function validarRun(run) {

    run = run.replace(/\./g, "").replace(/-/g, "").toUpperCase();

    let cuerpo = run.slice(0, -1);
    let dv = run.slice(-1);

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {

        suma += Number(cuerpo[i]) * multiplicador;

        multiplicador++;

        if (multiplicador > 7) {
            multiplicador = 2;
        }

    }

    let resto = 11 - (suma % 11);
    let dvEsperado = "";

    if (resto === 11) {
        dvEsperado = "0";
    } else if (resto === 10) {
        dvEsperado = "K";
    } else {
        dvEsperado = String(resto);
    }

    return dv === dvEsperado;

}

function registrarUsuario() {

    let run = document.getElementById("regRun").value;
    let nombre = document.getElementById("regNombre").value;
    let apellidos = document.getElementById("regApellidos").value;
    let correo = document.getElementById("regCorreo").value;
    let region = document.getElementById("regRegion").value;
    let comuna = document.getElementById("regComuna").value;
    let direccion = document.getElementById("regDireccion").value;
    let clave = document.getElementById("regClave").value;
    let claveConfirmar = document.getElementById("regClaveConfirmar").value;

    if (run === "" || nombre === "" || apellidos === "" || correo === "" || region === "" || comuna === "" || direccion === "" || clave === "" || claveConfirmar === "") {
        alert("Debe completar todos los campos obligatorios");
        return;
    }

    if (!validarRun(run)) {
        alert("El RUN ingresado no es válido");
        return;
    }

    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correo)) {
        alert("Ingrese un correo válido");
        return;
    }

    if (clave.length < 4 || clave.length > 10) {
        alert("La contraseña debe tener entre 4 y 10 caracteres");
        return;
    }

    if (clave !== claveConfirmar) {
        alert("Las contraseñas no coinciden");
        return;
    }

    alert("Registro exitoso. Ahora puedes iniciar sesión.");

    window.location.href = "login.html";

}