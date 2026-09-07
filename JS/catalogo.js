let lista = document.getElementById("listaProductos");
let checks = document.querySelectorAll('.filtros input[type="checkbox"]');
let precioMaximo = document.getElementById("precioMaximo");
let ordenCatalogo = document.getElementById("ordenCatalogo");

let parametros = new URLSearchParams(window.location.search);
for (let i = 0; i < checks.length; i++) {
    let valores = parametros.getAll("marca");
    if (esCategoria(checks[i].value)) {
        valores = parametros.getAll("categoria");
    }
    checks[i].checked = valores.indexOf(checks[i].value) !== -1;
}
if (parametros.has("precioMaximo")) {
    precioMaximo.value = parametros.get("precioMaximo");
}
if (parametros.has("orden")) {
    ordenCatalogo.value = parametros.get("orden");
}

function esCategoria(valor) {
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].categoria === valor) {
            return true;
        }
    }
    return false;
}

function compararProductos(a, b) {
    if (ordenCatalogo.value === "precio-asc") {
        return a.precio - b.precio;
    }
    if (ordenCatalogo.value === "precio-desc") {
        return b.precio - a.precio;
    }
    if (ordenCatalogo.value === "nombre-asc") {
        return a.nombre.localeCompare(b.nombre, "es");
    }
    if (ordenCatalogo.value === "nombre-desc") {
        return b.nombre.localeCompare(a.nombre, "es");
    }
    return 0;
}

function filtrar() {
    if (precioMaximo.reportValidity() === false) {
        return;
    }

    let categorias = [];
    let marcas = [];
    for (let i = 0; i < checks.length; i++) {
        if (checks[i].checked) {
            if (esCategoria(checks[i].value)) {
                categorias.push(checks[i].value);
            } else {
                marcas.push(checks[i].value);
            }
        }
    }

    let resultado = [];
    for (let i = 0; i < productos.length; i++) {
        let producto = productos[i];
        let cumpleCategoria = true;
        let cumpleMarca = true;
        let cumplePrecio = true;

        if (categorias.length > 0 && categorias.indexOf(producto.categoria) === -1) {
            cumpleCategoria = false;
        }
        if (marcas.length > 0 && marcas.indexOf(producto.marca) === -1) {
            cumpleMarca = false;
        }
        if (precioMaximo.value !== "" && producto.precio > Number(precioMaximo.value)) {
            cumplePrecio = false;
        }
        if (cumpleCategoria && cumpleMarca && cumplePrecio) {
            resultado.push(producto);
        }
    }

    resultado.sort(compararProductos);
    mostrarProductos(resultado);
}

function mostrarProductos(resultado) {
    lista.innerHTML = "";
    if (resultado.length === 0) {
        lista.innerHTML = '<p role="status">No hay productos con estos filtros.</p>';
    }

    for (let i = 0; i < resultado.length; i++) {
        let p = resultado[i];
        lista.innerHTML += `
        <article class="card tarjeta-catalogo">
            <a href="detalle.html?id=${p.id}"><img src="${p.imagen}" class="imagen-catalogo" alt="${p.nombre}"></a>
            <div class="card-body contenido-catalogo">
                <h5 class="card-title">${p.marca}</h5>
                <h6 class="titulo-producto"><a class="nombre-producto" href="detalle.html?id=${p.id}">${p.nombre} ${p.modelo}</a></h6>
                <p class="precio precio-catalogo">Precio: ${moneda(p.precio)}</p>
                <button type="button" class="btn btn-outline-dark boton-catalogo" onclick="agregarCarro(${p.id})">Agregar al carrito</button>
            </div>
        </article>`;
    }
}

function guardarFiltros() {
    let enlace = new URLSearchParams();
    for (let i = 0; i < checks.length; i++) {
        if (checks[i].checked) {
            let tipo = "marca";
            if (esCategoria(checks[i].value)) {
                tipo = "categoria";
            }
            enlace.append(tipo, checks[i].value);
        }
    }
    if (precioMaximo.value !== "") {
        enlace.set("precioMaximo", precioMaximo.value);
    }
    if (ordenCatalogo.value !== "") {
        enlace.set("orden", ordenCatalogo.value);
    }
    let direccion = window.location.pathname;
    if (enlace.toString() !== "") {
        direccion += "?" + enlace.toString();
    }
    window.history.replaceState(null, "", direccion);
}

function aplicarFiltros() {
    if (precioMaximo.reportValidity()) {
        filtrar();
        guardarFiltros();
    }
}

function limpiarFiltros() {
    for (let i = 0; i < checks.length; i++) {
        checks[i].checked = false;
    }
    precioMaximo.value = "";
    aplicarFiltros();
}

document.getElementById("btnFiltrar").onclick = aplicarFiltros;
document.getElementById("btnLimpiar").onclick = limpiarFiltros;
ordenCatalogo.onchange = aplicarFiltros;
filtrar();
