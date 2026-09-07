let parametrosDetalle = new URLSearchParams(window.location.search);
let idDetalle = Number(parametrosDetalle.get("id"));
let seleccionado = buscarProducto(idDetalle);

if (seleccionado === null) {
    document.querySelector("main").innerHTML = '<section class="seccion-blanca seccion-pagina"><h1>Producto no encontrado</h1><a href="productos.html">Volver al catálogo</a></section>';
} else {
    let camposImagen = ["imagen", "imagenS", "imagenB", "imagenD"];
    for (let i = 0; i < camposImagen.length; i++) {
        let campo = camposImagen[i];
        let imagen = document.getElementById(campo);
        imagen.src = seleccionado[campo];
        imagen.alt = seleccionado.nombre;
    }

    document.getElementById("nombre").textContent = seleccionado.nombre;
    document.getElementById("marca").textContent = seleccionado.marca + " · " + seleccionado.modelo;
    document.getElementById("precio").textContent = "Precio: " + moneda(seleccionado.precio);
    document.getElementById("descripcion").textContent = seleccionado.descripcion;

document.getElementById("accionesDetalle").innerHTML = `
        <p>Stock disponible: ${seleccionado.stock}</p>
        <button class="btn btn-dark" onclick="agregarCarro(${seleccionado.id})">Agregar al carrito</button>`;
}
