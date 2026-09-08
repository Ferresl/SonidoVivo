let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

function moneda(precio) {
    return "$" + precio.toLocaleString("es-CL");
}

function buscarProducto(id) {
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            return productos[i];
        }
    }
    return null;
}

function avisar(mensaje) {
    let aviso = document.getElementById("estadoCarrito");
    aviso.textContent = mensaje;
    aviso.hidden = false;
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function agregarCarro(id) {
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === id) {
            carrito[i].cantidad++;
            guardarCarrito();
            avisar("Producto agregado al carrito.");
            return;
        }
    }
    carrito.push({ id: id, cantidad: 1 });
    guardarCarrito();
    avisar("Producto agregado al carrito.");
}

function cambiarCantidad(id, valor) {
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === id) {
            carrito[i].cantidad = Number(valor);
        }
    }
    guardarCarrito();
}

function eliminarProducto(id) {
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === id) {
            carrito.splice(i, 1);
            break;
        }
    }
    guardarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
}

function actualizarCarrito() {
    let cantidadTotal = 0;
    let precioTotal = 0;
    let contenido = "";

    for (let i = 0; i < carrito.length; i++) {
        let item = carrito[i];
        let producto = buscarProducto(item.id);
        let subtotal = producto.precio * item.cantidad;
        cantidadTotal += item.cantidad;
        precioTotal += subtotal;

        contenido += `<article class="carrito-fila">
            <a href="detalle.html?id=${producto.id}">
                <img class="foto-carrito" src="${escaparHTML(producto.imagen)}" alt="${escaparHTML(producto.nombre)}">
            </a>
            <div>
                <h2 class="titulo-carrito"><a class="nombre-producto" href="detalle.html?id=${producto.id}">${escaparHTML(producto.nombre)}</a></h2>
                <p class="texto-carrito">${escaparHTML(producto.marca)} · ${escaparHTML(producto.modelo)}</p>
                <p class="texto-carrito">${moneda(producto.precio)} por unidad</p>
            </div>
            <div>
                <label for="cantidad-${producto.id}">Cantidad</label>
                <input class="cantidad-carrito" id="cantidad-${producto.id}" type="number"
                    step="1" value="${item.cantidad}"
                    onchange="cambiarCantidad(${producto.id}, this.value)">
                <small class="existencias-carrito">Stock: ${producto.stock}</small>
            </div>
            <strong>${moneda(subtotal)}</strong>
            <button class="btn btn-outline-danger" onclick="eliminarProducto(${producto.id})">Eliminar</button>
        </article>`;
    }

    let contadores = document.querySelectorAll("[data-carrito-contador]");
    for (let i = 0; i < contadores.length; i++) {
        contadores[i].textContent = cantidadTotal;
    }

    let lista = document.getElementById("contenidoCarrito");
    if (lista !== null) {
        if (carrito.length === 0) {
            contenido = '<p class="carrito-vacio">Tu carrito está vacío. <a href="productos.html">Explorar productos</a></p>';
        }
        lista.innerHTML = contenido;
        document.getElementById("totalCarrito").textContent = moneda(precioTotal);
        document.getElementById("vaciarCarrito").disabled = carrito.length === 0;
        document.getElementById("mostrarPago").disabled = carrito.length === 0;
        document.getElementById("formularioPago").hidden = true;
        document.getElementById("resultadoPago").hidden = true;
    }
}

document.body.insertAdjacentHTML("beforeend", '<p hidden id="estadoCarrito" class="estado-carrito" role="status" aria-live="polite"></p>');
let enlaces = document.querySelectorAll(".enlace-carrito");
for (let i = 0; i < enlaces.length; i++) {
    enlaces[i].href = "carrito.html";
    enlaces[i].setAttribute("aria-label", "Ver carrito");
    enlaces[i].insertAdjacentHTML("beforeend", '<span data-carrito-contador class="badge bg-dark">0</span>');
}

let botonVaciar = document.getElementById("vaciarCarrito");
if (botonVaciar !== null) {
    botonVaciar.onclick = vaciarCarrito;
}

let botonPago = document.getElementById("mostrarPago");
if (botonPago !== null) {
    let formulario = document.getElementById("formularioPago");
    let resultado = document.getElementById("resultadoPago");

    botonPago.onclick = function () {
        formulario.hidden = false;
        resultado.hidden = true;
        document.getElementById("metodoPago").focus();
    };

    document.getElementById("cancelarPago").onclick = function () {
        formulario.hidden = true;
        botonPago.focus();
    };

    formulario.onsubmit = function (evento) {
        evento.preventDefault();
        if (carrito.length === 0 || !formulario.reportValidity()) return;

        for (let i = 0; i < carrito.length; i++) {
            if (!Number.isInteger(carrito[i].cantidad) || carrito[i].cantidad <= 0) {
                resultado.textContent = "Revisa las cantidades antes de pagar. Deben ser números enteros mayores a cero.";
                resultado.hidden = false;
                return;
            }
        }

        let seguimiento = Math.floor(1000000000 + Math.random() * 9000000000);
        resultado.innerHTML = 'Tu compra va en camino. Contáctate con <a href="https://www.chilexpress.cl/" target="_blank" rel="noopener noreferrer">Chilexpress</a> para más detalles.<br>Número de seguimiento (demostración): ' + seguimiento;
        resultado.hidden = false;
        formulario.hidden = true;
        formulario.reset();
    };
}
actualizarCarrito();
