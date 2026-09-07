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
                <td>${escaparHTML(usuarios[i].run)}</td>
                <td>${escaparHTML(usuarios[i].nombre)}</td>
                <td>${escaparHTML(usuarios[i].apellidos)}</td>
                <td>${escaparHTML(usuarios[i].correo)}</td>
                <td>${escaparHTML(usuarios[i].tipoUsuario)}</td>
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

function validarUsuario(u) {
    u.correo=u.correo.trim().toLowerCase();
    if (![u.nombre,u.apellidos,u.region,u.comuna,u.direccion].every(v=>v.trim()) || !validarRun(u.run) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u.correo) || !u.clave || u.clave.length<4 || u.clave.length>10) { alert('Completa todos los datos, un RUN y correo válidos y una clave de 4 a 10 caracteres.'); return false; }
    const normalizar=r=>r.replace(/[.\-]/g,'').toUpperCase();
    if (usuarios.some(x=>x.id!==u.id && (x.correo.toLowerCase()===u.correo || normalizar(x.run)===normalizar(u.run)))) { alert('Correo o RUN ya registrado.'); return false; }
    return true;
}
function guardarCambiosUsuario() {
    const actual=usuarios.find(u=>u.id===idUsuarioEditando);
    const valor=id=>document.getElementById(id).value;
    const usuario={...actual,run:valor('editRun'),nombre:valor('editNombreUsuario'),apellidos:valor('editApellidos'),correo:valor('editCorreoUsuario'),tipoUsuario:valor('editTipoUsuario'),region:valor('editRegion'),comuna:valor('editComuna'),direccion:valor('editDireccion')};
    if (!validarUsuario(usuario)) return;
    if (usuario.id===usuarioActual()?.id && usuario.tipoUsuario!=='Administrador') { alert('No puedes quitarte tu propio acceso de administrador.'); return; }
    const nuevos=usuarios.map(u=>u.id===usuario.id?usuario:u);
    if (!guardarLocal('sonidovivo.usuarios',nuevos)) return;
    usuarios=nuevos; cerrarFormularioUsuario(); renderizarTablaUsuarios(); alert('Usuario actualizado');
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

    let nuevoId = Math.max(0,...usuarios.map(u=>u.id))+1;

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

    usuarioNuevo.clave=document.getElementById('nuevoClave').value;
    if (!validarUsuario(usuarioNuevo)) return;
    const nuevos=[...usuarios,usuarioNuevo];
    if (!guardarLocal('sonidovivo.usuarios',nuevos)) return;
    usuarios=nuevos;

    alert("Usuario agregado");

    cerrarFormularioNuevoUsuario();

    renderizarTablaUsuarios();

}

function cerrarFormularioNuevoUsuario() {

    document.getElementById("formularioNuevoUsuario").style.display = "none";

    document.getElementById("nuevoClave").value = "";
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

    if (!/^\d{7,8}[0-9K]$/.test(run)) return false;
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