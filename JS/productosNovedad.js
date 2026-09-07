
let productosNovedad =[
    {
        id: 1,
        codigo: "GA001",
        categoria: "Guitarras Acústicas",
        nombre: "Guitarra Acústica Folk",
        marca: "Yamaha",
        modelo: "F310",
        stock: 8,
        precio: 129990,
        descripcion: "Guitarra acústica folk con tapa de abeto y cuerpo de meranti, diseñada para ofrecer una respuesta equilibrada y una buena proyección acústica.",
        imagen: "Images/CatalogoImages/GA001-front.png",
        imagenS: "Images/CatalogoImages/GA001-side.png",
        imagenB: "Images/CatalogoImages/GA001-back.png",
        imagenD: "Images/CatalogoImages/GA001-detail.png"
    },
     {
        id: 50,
        codigo: "ES004",
        categoria: "Estudio y Grabación",
        nombre: "Monitor de Estudio 5\"",
        marca: "Yamaha",
        modelo: "HS5",
        stock: 2,
        precio: 349990,
        descripcion: "Monitor activo de estudio de 5 pulgadas con respuesta plana, diseñado para realizar mezclas y monitoreo con mayor precisión.",
        imagen: "Images/CatalogoImages/ES004-front.png",
        imagenS: "Images/CatalogoImages/ES004-side.png",
        imagenB: "Images/CatalogoImages/ES004-back.png",
        imagenD: "Images/CatalogoImages/ES004-detail.png"
    },
    {
        id: 29,
        codigo: "MI003",
        categoria: "Micrófonos",
        nombre: "Micrófono Condensador",
        marca: "Audio-Technica",
        modelo: "AT2020",
        stock: 4,
        precio: 199990,
        descripcion: "Micrófono de condensador cardioide con conexión XLR, diseñado para capturar voces e instrumentos con alto nivel de detalle.",
        imagen: "Images/CatalogoImages/MI003-front.png",
        imagenS: "Images/CatalogoImages/MI003-side.png",
        imagenB: "Images/CatalogoImages/MI003-back.png",
        imagenD: "Images/CatalogoImages/MI003-detail.png"
    },
    {
        id: 13,
        codigo: "BA003",
        categoria: "Bajos Eléctricos",
        nombre: "Bajo Acústico 4 Cuerdas",
        marca: "Yamaha",
        modelo: "APX700II",
        stock: 2,
        precio: 429990,
        descripcion: "Bajo electroacústico de cuatro cuerdas con sistema electrónico y afinador integrado, preparado para interpretación acústica y amplificada.",
        imagen: "Images/CatalogoImages/BA003-front-1254x1254.png",
        imagenS: "Images/CatalogoImages/BA003-side.png",
        imagenB: "Images/CatalogoImages/BA003-back.png",
        imagenD: "Images/CatalogoImages/BA003-detail.png"
    },
    {
        id: 14,
        codigo: "BT001",
        categoria: "Baterías",
        nombre: "Batería Acústica 5 Piezas",
        marca: "Pearl",
        modelo: "Roadshow",
        stock: 2,
        precio: 599990,
        descripcion: "Set de batería acústica de cinco piezas que incluye hardware, platillos y pedal de bombo para una configuración completa.",
        imagen: "Images/CatalogoImages/BT001-front.png",
        imagenS: "Images/CatalogoImages/BT001-side.png",
        imagenB: "Images/CatalogoImages/BT001-back.png",
        imagenD: "Images/CatalogoImages/BT001-detail.png"
    },
    {
        id: 34,
        codigo: "PE004",
        categoria: "Pedales de Efectos",
        nombre: "Pedal Afinador Cromático",
        marca: "Boss",
        modelo: "TU-3",
        stock: 8,
        precio: 89990,
        descripcion: "Afinador cromático en formato pedal con indicador visual para realizar ajustes rápidos y precisos durante ensayos o presentaciones.",
        imagen: "Images/CatalogoImages/PE004-front.png",
        imagenS: "Images/CatalogoImages/PE004-side.png",
        imagenB: "Images/CatalogoImages/PE004-back.png",
        imagenD: "Images/CatalogoImages/PE004-detail.png"
    },
    {
        id: 30,
        codigo: "MI004",
        categoria: "Micrófonos",
        nombre: "Micrófono USB de Condensador",
        marca: "Blue",
        modelo: "Yeti",
        stock: 5,
        precio: 299990,
        descripcion: "Micrófono USB de condensador con cuatro patrones polares, versátil para streaming, podcast, locución y creación de contenido.",
        imagen: "Images/CatalogoImages/MI004-front.png",
        imagenS: "Images/CatalogoImages/MI004-side.png",
        imagenB: "Images/CatalogoImages/MI004-back.png",
        imagenD: "Images/CatalogoImages/MI004-detail.png"
    },


];


let listaNovedad =
    document.getElementById("listaProductosNovedad");

for (let i = 0; i < productosNovedad.length; i += 4) {

    let grupo = productosNovedad.slice(i, i + 4);
    let cards = "";


    grupo.forEach((producto) => {

        cards += `

            <div class="card card-catalogo">

                <img
                    src="${producto.imagen}"
                    class="card-img-top imagen-novedad"
                    alt="${producto.nombre}"
                    onclick="verDetalle(${producto.id})"
                >

                <div class="card-body">

                    <h6 class="marca-novedad">
                        ${producto.marca}
                    </h6>

                    <h5 class="card-title">
                        ${producto.nombre}
                    </h5>

                    <p class="modelo-novedad">
                        ${producto.modelo}
                    </p>

                    <p class="precio-novedad">
                        $${producto.precio.toLocaleString("es-CL")}
                    </p>

                    <button
                        class="btn btn-dark"
                        onclick="verDetalle(${producto.id})"
                    >
                        Ver producto
                    </button>

                </div>

            </div>

        `;

    });


    listaNovedad.innerHTML += `

        <div class="carousel-item ${i === 0 ? "active" : ""}">

            <div class="grupo-cards">

                ${cards}

            </div>

        </div>

    `;

}


function verDetalle(id){

    let productoSeleccionado;

    for (let i = 0; i < productosNovedad.length; i++){

        if(productosNovedad[i].id === id){
            productoSeleccionado = productosNovedad[i];
        }
    }

    localStorage.setItem("producto",JSON.stringify(productoSeleccionado));
    window.location.href = "detalle.html";
}


