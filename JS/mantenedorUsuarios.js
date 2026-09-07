let usuarios = [

    {
        id: 1,
        run: "19011022-K",
        nombre: "Camila",
        apellidos: "Rojas Muñoz",
        correo: "camila.rojas@correo.cl",
        tipoUsuario: "Cliente",
        region: "Metropolitana",
        comuna: "Quilicura",
        direccion: "Los Aromos 245"
    },

    {
        id: 2,
        run: "17233144-5",
        nombre: "Matías",
        apellidos: "González Pérez",
        correo: "matias.gonzalez@correo.cl",
        tipoUsuario: "Administrador",
        region: "Metropolitana",
        comuna: "Santiago",
        direccion: "Av. Libertador 1200"
    }

];

let regionesComunas = {

    "Metropolitana": ["Santiago", "Quilicura", "Providencia", "Maipú"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"],
    "Biobío": ["Concepción", "Talcahuano", "Los Ángeles"]

};

function cargarRegiones() {

    let selectsRegion = [
        document.getElementById("nuevoRegion"),
        document.getElementById("editRegion")
    ];

    for (let j = 0; j < selectsRegion.length; j++) {

        selectsRegion[j].innerHTML = `<option value="">Seleccione región</option>`;

        for (let region in regionesComunas) {
            selectsRegion[j].innerHTML += `<option value="${region}">${region}</option>`;
        }

    }

}

function actualizarComunas(idRegion, idComuna) {

    let region = document.getElementById(idRegion).value;
    let selectComuna = document.getElementById(idComuna);

    selectComuna.innerHTML = `<option value="">Seleccione comuna</option>`;

    if (region === "") {
        return;
    }

    let comunas = regionesComunas[region];

    for (let i = 0; i < comunas.length; i++) {
        selectComuna.innerHTML += `<option value="${comunas[i]}">${comunas[i]}</option>`;
    }

}

cargarRegiones();

function renderizarTablaUsuarios() {

    let cuerpoTablaUsuarios = document.getElementById("cuerpoTablaUsuarios");

    cuerpoTablaUsuarios.innerHTML = "";

    for (let i = 0; i < usuarios.length; i++) {

        cuerpoTablaUsuarios.innerHTML += `
            <tr>
                <td>${usuarios[i].run}</td>
                <td>${usuarios[i].nombre}</td>
                <td>${usuarios[i].apellidos}</td>
                <td>${usuarios[i].correo}</td>
                <td>${usuarios[i].tipoUsuario}</td>
                <td>
                    <button class="btn btn-sm btn-dark" onclick="editarUsuario(${usuarios[i].id})">Editar</button>
                </td>
            </tr>
        `;

    }

}

renderizarTablaUsuarios();

let idUsuarioEditando = null;

function editarUsuario(id) {

    let usuario;

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id === id) {
            usuario = usuarios[i];
        }
    }

    idUsuarioEditando = id;

    document.getElementById("editRun").value = usuario.run;
    document.getElementById("editNombreUsuario").value = usuario.nombre;
    document.getElementById("editApellidos").value = usuario.apellidos;
    document.getElementById("editCorreoUsuario").value = usuario.correo;
    document.getElementById("editTipoUsuario").value = usuario.tipoUsuario;

    document.getElementById("editRegion").value = usuario.region;
    actualizarComunas("editRegion", "editComuna");
    document.getElementById("editComuna").value = usuario.comuna;
    document.getElementById("editDireccion").value = usuario.direccion;

    document.getElementById("formularioEditarUsuario").style.display = "block";
    document.getElementById("formularioEditarUsuario").scrollIntoView({behavior: "smooth"});

}

function guardarCambiosUsuario() {

    let runIngresado = document.getElementById("editRun").value;

    if (!validarRun(runIngresado)) {
        alert("El RUN ingresado no es válido");
        return;
    }

    for (let i = 0; i < usuarios.length; i++) {

        if (usuarios[i].id === idUsuarioEditando) {

            usuarios[i].run = runIngresado;
            usuarios[i].nombre = document.getElementById("editNombreUsuario").value;
            usuarios[i].apellidos = document.getElementById("editApellidos").value;
            usuarios[i].correo = document.getElementById("editCorreoUsuario").value;
            usuarios[i].tipoUsuario = document.getElementById("editTipoUsuario").value;
            usuarios[i].region = document.getElementById("editRegion").value;
            usuarios[i].comuna = document.getElementById("editComuna").value;
            usuarios[i].direccion = document.getElementById("editDireccion").value;

        }

    }

    alert("Usuario actualizado");

    cerrarFormularioUsuario();

    renderizarTablaUsuarios();

}

function cerrarFormularioUsuario() {
    document.getElementById("formularioEditarUsuario").style.display = "none";
}

function mostrarFormularioNuevoUsuario() {

    document.getElementById("formularioNuevoUsuario").style.display = "block";
    document.getElementById("formularioNuevoUsuario").scrollIntoView({behavior: "smooth"});

}

function guardarNuevoUsuario() {

    let runIngresado = document.getElementById("nuevoRun").value;

    if (!validarRun(runIngresado)) {
        alert("El RUN ingresado no es válido");
        return;
    }

    let nuevoId = usuarios.length + 1;

    let usuarioNuevo = {
        id: nuevoId,
        run: runIngresado,
        nombre: document.getElementById("nuevoNombreUsuario").value,
        apellidos: document.getElementById("nuevoApellidos").value,
        correo: document.getElementById("nuevoCorreoUsuario").value,
        tipoUsuario: document.getElementById("nuevoTipoUsuario").value,
        region: document.getElementById("nuevoRegion").value,
        comuna: document.getElementById("nuevoComuna").value,
        direccion: document.getElementById("nuevoDireccion").value
    };

    usuarios.push(usuarioNuevo);

    alert("Usuario agregado");

    cerrarFormularioNuevoUsuario();

    renderizarTablaUsuarios();

}

function cerrarFormularioNuevoUsuario() {

    document.getElementById("formularioNuevoUsuario").style.display = "none";

    document.getElementById("nuevoRun").value = "";
    document.getElementById("nuevoNombreUsuario").value = "";
    document.getElementById("nuevoApellidos").value = "";
    document.getElementById("nuevoCorreoUsuario").value = "";
    document.getElementById("nuevoRegion").value = "";
    document.getElementById("nuevoComuna").innerHTML = `<option value="">Seleccione comuna</option>`;
    document.getElementById("nuevoDireccion").value = "";

}

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