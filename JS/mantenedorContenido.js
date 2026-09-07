function renderizarTabla() {

    let cuerpoTabla = document.getElementById("cuerpoTabla");

    cuerpoTabla.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {

        cuerpoTabla.innerHTML += `
            <tr>
                <td>${escaparHTML(productos[i].codigo)}</td>
                <td>${escaparHTML(productos[i].nombre)}</td>
                <td>${escaparHTML(productos[i].marca)}</td>
                <td>$${productos[i].precio.toLocaleString("es-CL")}</td>
                <td>${productos[i].stock}</td>
                <td>
                    <button class="btn btn-sm btn-dark" onclick="editarProducto(${productos[i].id})">Editar</button>
                </td>
            </tr>
        `;

    }

}

renderizarTabla();

let idProductoEditando = null;

function editarProducto(id) {

    let producto;

    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            producto = productos[i];
        }
    }

    idProductoEditando = id;

    document.getElementById("editNombre").value = producto.nombre;
    document.getElementById("editMarca").value = producto.marca;
    document.getElementById("editPrecio").value = producto.precio;
    document.getElementById("editStock").value = producto.stock;

    document.getElementById("formularioEditar").style.display = "block";
    document.getElementById("formularioEditar").scrollIntoView({behavior: "smooth"})

}

function datosProducto(prefijo) {
    const valor = campo => document.getElementById(prefijo+campo).value.trim();
    const nombre=valor('Nombre'), marca=valor('Marca'), precio=Number(valor('Precio')), stock=Number(valor('Stock'));
    if (!nombre || !marca || !valor('Precio') || !valor('Stock') || !Number.isFinite(precio) || precio<0 || !Number.isInteger(stock) || stock<0) { alert('Completa nombre, marca, precio y stock válidos.'); return null; }
    return {nombre,marca,precio,stock};
}
function guardarCambios() {
    const datos=datosProducto('edit'); if (!datos) return;
    const nuevos=productos.map(p=>p.id===idProductoEditando?{...p,...datos}:p);
    if (!guardarLocal('sonidovivo.productos',nuevos)) return;
    productos=nuevos; cerrarFormulario(); renderizarTabla(); alert('Producto actualizado');
}
function mostrarFormularioNuevo() { document.getElementById('formularioNuevo').style.display='block'; }
function cerrarFormularioNuevo() { document.getElementById('formularioNuevo').style.display='none'; }
function guardarNuevoProducto() {
    const datos=datosProducto('nuevo'); if (!datos) return;
    const codigo=document.getElementById('nuevoCodigo').value.trim().toUpperCase();
    if (!codigo || productos.some(p=>p.codigo.toUpperCase()===codigo)) { alert('El código debe ser único.'); return; }
    const imagen=document.getElementById('nuevoImagen').value.trim() || 'Images/Inicio/Novedades.png';
    if (!/^Images\/[a-zA-Z0-9_ /().-]+\.(png|jpe?g|webp)$/i.test(imagen) || imagen.includes('..')) { alert('Usa una ruta de imagen dentro de Images/.'); return; }
    const nuevo={...datos,codigo,id:Math.max(0,...productos.map(p=>p.id))+1,categoria:document.getElementById('nuevoCategoria').value,modelo:document.getElementById('nuevoModelo').value.trim(),descripcion:document.getElementById('nuevoDescripcion').value.trim(),imagen,imagenS:imagen,imagenB:imagen,imagenD:imagen};
    const nuevos=[...productos,nuevo]; if (!guardarLocal('sonidovivo.productos',nuevos)) return;
    productos=nuevos; cerrarFormularioNuevo(); renderizarTabla(); alert('Producto agregado');
}
function cerrarFormulario() {
    document.getElementById("formularioEditar").style.display = "none";
    
}
document.getElementById('nuevoCategoria').innerHTML=[...new Set(productos.map(p=>p.categoria))].map(c=>'<option>'+escaparHTML(c)+'</option>').join('');
