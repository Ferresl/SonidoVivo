let producto = JSON.parse(
    localStorage.getItem("producto")
);



document.getElementById("imagen").src =
    producto.imagen;

document.getElementById("imagenS").src =
    producto.imagenS;

document.getElementById("imagenB").src =
    producto.imagenB;

document.getElementById("imagenD").src =
    producto.imagenD;

document.getElementById("nombre").textContent =
    producto.nombre;

document.getElementById("marca").textContent=
    producto.marca;

document.getElementById("precio").textContent =
    "Precio: $" + producto.precio.toLocaleString("es-CL");

document.getElementById("descripcion").textContent =
    producto.descripcion;









