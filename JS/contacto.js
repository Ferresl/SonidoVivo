document.getElementById("formContacto").addEventListener("submit", function(event) {

    event.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let comentario = document.getElementById("comentario").value.trim();

    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nombre === "") {
        alert("Debe ingresar su nombre");
        return;
    }

    if (nombre.length > 100) {
        alert("El nombre no puede superar los 100 caracteres");
        return;
    }

    if (correo === "") {
        alert("Debe ingresar su correo electrónico");
        return;
    }

    if (correo.length > 100 || !formatoCorreo.test(correo)) {
        alert("Ingrese un correo electrónico válido");
        return;
    }

    if (comentario === "") {
        alert("Debe ingresar un comentario");
        return;
    }

    if (comentario.length > 500) {
        alert("El comentario no puede superar los 500 caracteres");
        return;
    }

    alert("Mensaje enviado correctamente");
    document.getElementById("formContacto").reset();

});
