function ingresar() {

    // 1. Toma lo que el usuario escribió en los inputs
    let correo = document.getElementById("correo").value;
    let clave = document.getElementById("clave").value;

    // 2. Revisa que no queden campos vacíos
    if (correo === "" || clave === "") {
        alert("Debe completar todos los campos");
        return;
    }

    // 3. Revisa que el correo tenga formato válido (algo@algo.algo)
    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correo)) {
        alert("Ingrese un correo válido");
        return;
    }

    // 4. La clave debe tener entre 4 y 10 caracteres
    if (clave.length < 4 || clave.length > 10) {
        alert("La clave debe tener entre 4 y 10 caracteres");
        return;
    }

    // 5. Comparo contra los usuarios fijos (mientras no hay base de datos)
    if (correo === "adminsonido@vivo.cl" && clave === "admin1234") {

        window.location.href = "admin.html";

    } else if (correo === "clientesonido@vivo.cl" && clave === "cliente123") {

        window.location.href = "Inicio.html";

    } else {

        // 6. Si no coincide con ninguno, error
        alert("Correo o clave incorrectos");

    }

}

function mostrarClave() {

    let clave = document.getElementById("clave");
    let ojito = document.getElementById("ojito");

    if (clave.type === "password") {
        clave.type = "text";
        ojito.textContent = "🙈";
    } else {
        clave.type = "password";
        ojito.textContent = "👁";
    }

}