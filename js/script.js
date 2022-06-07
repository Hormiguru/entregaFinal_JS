
const contenedor = document.getElementById("container");
let nombre = localStorage.getItem("nombreUsuario")
let genero = localStorage.getItem("generoUsuario")
function borrarPantalla() { contenedor.innerHTML = "" }

// Calculamos el momento del dia
let fecha = new Date();
let hora = fecha.getHours();
let buenas;
(hora >= 0 && hora < 12) ? buenas = "Buenos días" :
  (hora >= 12 && hora < 19) ? buenas = "Buenas tardes" :
    buenas = "Buenas noches";

// los productos
let productos = [
  {
    id: 01,
    categoria: "papeleria",
    nombre: "Boligrafo",
    modelo: "BIC-BOL-M250CA",
    precio: 12,
    inventario: 40,
  },
  {
    id: 02,
    categoria: "papeleria",
    nombre: "Goma",
    modelo: "AZO-GOM-6590",
    precio: 21.35,
    inventario: 15,
  },
  {
    id: 03,
    categoria: "papeleria",
    nombre: "Sacapuntas",
    modelo: "ACO-SAC-P3888",
    precio: 785.79,
    inventario: 3,
  },
  {
    id: 04,
    categoria: "cafeteria",
    nombre: "Nescafe Clasico 60g",
    modelo: "NES-NCF-60GR",
    precio: 66.35,
    inventario: 16,
  },
  {
    id: 05,
    categoria: "cafeteria",
    nombre: "Cafe Molido Intenso",
    modelo: "CAP-CAF-VER",
    precio: 143.31,
    inventario: 22,
  },
  {
    id: 06,
    categoria: "cafeteria",
    nombre: "Te De Hierbabuena",
    modelo: "MCC-TE-HIERB25",
    precio: 37.89,
    inventario: 10,
  },
  {
    id: 07,
    categoria: "limpieza",
    nombre: "Sanitas",
    modelo: "LKC-TOAI-92231",
    precio: 219.20,
    inventario: 50,
  },
  {
    id: 08,
    categoria: "limpieza",
    nombre: "Papel higienico",
    modelo: "TOR-HIGT-700148",
    precio: 558.65,
    inventario: 100,
  },
  {
    id: 09,
    categoria: "limpieza",
    nombre: "Jabon liquido",
    modelo: "ALF-JABON-5480",
    precio: 36.79,
    inventario: 78,
  },
]
// ----------------------------------------------------  
// si no tenermos aun el nombre o el genero preferido, se lo solicitamos
if (nombre == null || genero == null) {
  contenedor.innerHTML = `<div class="d-flex justify-content-left"><form class="bg-light border border-success border-3 rounded m-5 p-2 " >
  <label for="nombreUsuario">Nombre: </label><br>
  <input type="text" id="nombreUsuario" name="nombreUsuario"><br><br>
  <label>Indica como prefiere que me dirija a ud<br>
  <input list="generos" id="generoUsuario" name="generoUsuario" /></label>
  <datalist id="generos">
  <option value="Masculino">
  <option value="Femenino">
  <option value="Prefiero no definirlo">
</datalist><br><br>
<div class="d-flex justify-content-end">
<input type="button" value="Entrar" onclick="infoUsuario()"> 
</div>
</form> </div>`
} else {
  bienvenida()
}

// lo grabamos en la memoria local
function infoUsuario() {
  localStorage.setItem("nombreUsuario", document.getElementById("nombreUsuario").value);
  localStorage.setItem("generoUsuario", document.getElementById("generoUsuario").value);
  nombre = localStorage.getItem("nombreUsuario")
  genero = localStorage.getItem("generoUsuario")
  borrarPantalla()
  bienvenida()
}

// Inicia todo aqui
function bienvenida() {

  contenedor.innerHTML = `
  <div class="m-2 p-2">
    <div class="btn-group" role="group" aria-label="Basic example">
    <button type="button" class="btn btn-success">Todos</button>
    <button type="button" class="btn btn-success">Papeleria</button>
    <button type="button" class="btn btn-success">Cafeteria</button>
    <button type="button" class="btn btn-success">Limpieza</button>
    </div>
  </div>
  `
  Toastify({
    text: `      ${buenas} ${nombre} \n Bienvenid${preferencia(genero)} a Papeleria Alfa\n`,
    duration: 3000,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    callback: function () { },
  }).showToast();
  Toastify({
    text: `Si no eres ${nombre} da click aqui`,
    oldestFirst: true,
    duration: 4000,
    newWindow: true,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    onClick: function () { otroUsuario() }, // Callback after click
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();


  catalogo()
}


function catalogo() {
  let tar = document.createElement("div");
  tar.classList.add("row", "row-cols-auto", "justify-content-around", "m-2", "p-2");
  contenedor.appendChild(tar);
  productos.forEach((producto, indice) => {
    let card = document.createElement(`div`);
    card.classList.add("card", "col", "m-2", "border-success", "border-3", "bg-success", "mt-1");
    card.style = "--bs-bg-opacity: .05;"
    card.style.borderTopLeftRadius = "2rem"
    card.style.borderBottomRightRadius = "2rem"
    card.style.width = "15rem";
    // style("width: 18rem;");
    let html = `
    <img src="./Img/productos/${producto.id}.jpg" alt="${producto.nombre}" class="m-2 rounded-circle  ">
      <div class="card-body border border-secondary mb-4 bg-light">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">
        Precio: ${producto.precio}<br>
        Modelo: ${producto.modelo}<br>
        Iva: 16% (`+ "$" + parseFloat(producto.precio * (16 / 100)).toFixed(2) + `)<br>
        Inventario: ${producto.inventario}<br></p>
        </p>
        <p class="card-text"></p>
        <a href="#cart" class="btn btn-success" onClick="agregarAlCarrito(${indice})">Comprar</a>
      </div>
        `;
    card.innerHTML = html;
    tar.appendChild(card);
  });
}

let modalCarrito = document.getElementById("carrito");
const agregarAlCarrito = (indiceDelArrayProducto) => {
  //findIndex devuelve el indice del elemento encontrado
  // si no encuentra nada devuelve menos 1 (-1)
  const indiceEncontradoCarrito = cart.findIndex((elemento) => {
    return elemento.id === productos[indiceDelArrayProducto].id;
  });
  if (indiceEncontradoCarrito === -1) {
    //agrego el producto
    const productoAgregar = productos[indiceDelArrayProducto];
    productoAgregar.cantidad = 1;
    cart.push(productoAgregar);

    dibujarCarrito();
  } else {
    //incremento cantidad
    cart[indiceEncontradoCarrito].cantidad += 1;

    dibujarCarrito();
  }
};
const dibujarCarrito = () => {
  let total = 0;
  modalCarrito.className = "carrito";
  modalCarrito.innerHTML = "";
  if (cart.length > 0) {
    cart.forEach((producto, indice) => {
      total = total + producto.precio * producto.cantidad;
      const carritoContainer = document.createElement("div");
      carritoContainer.className = "producto-carrito";
      carritoContainer.innerHTML = `
        <img class="car-img" src="./Img/productos/${producto.id}.jpg"/>
        <div class="product-details">
          ${producto.nombre}
        </div>
        <div class="product-details" > Cantidad: ${producto.cantidad}</div>
        <div class="product-details"> Precio: $`+ parseFloat(producto.precio).toFixed(2) + `</div>
        <div class="product-details"> Subtotal: $ `+ parseFloat(producto.precio * producto.cantidad).toFixed(2) + `</div>
        <button class="btn btn-danger"  id="remove-product" onClick="removeProduct(${indice})">Eliminar producto</button>
         `;
      modalCarrito.appendChild(carritoContainer);
    });
    // Dibujo el total y lo appendeo en el div capturado y guardado en la variable modalCarrito
    const totalContainer = document.createElement("div");
    totalContainer.className = "total-carrito";
    totalContainer.innerHTML = `<div class= "total"> TOTAL $ ` + parseFloat(total).toFixed(2) + `</div>
    <button class= "btn btn-danger finalizar" id="finalizar" onClick="finalizarCompra()"> FINALIZAR COMPRA </button>`;
    modalCarrito.appendChild(totalContainer);
  } else {
    modalCarrito.classList.remove("cart");
  }
};

let cart = [];

const removeProduct = (indice) => {
  cart.splice(indice, 1);

  dibujarCarrito();
};
const finalizarCompra = () => {
  const total = document.getElementsByClassName("total")[0].innerHTML;
  modalCarrito.innerHTML = "";
  const compraFinalizada = `<div class="compra-finalizada"><p class="compra-parrafo"> La compra se completo    ${total} </p></div>`;
  modalCarrito.innerHTML = compraFinalizada;
};


const mostrarMensaje = () => {
  const nombreCliente = document.getElementById("nombre").value;
  const domicilioCliente = document.getElementById("domicilio").value;
  modalCarrito.innerHTML = "";
  let mensaje = `<div class="mensaje-final">Gracias ${nombreCliente} por su compra! en 72 horas recibira su paquete en ${domicilioCliente} </div>`;
  modalCarrito.innerHTML = mensaje;
};










// funciones atemporales
function preferencia(genero) {
  // ya definido el genero cambiamos los parametros que se usaran
  (genero == "Femenino") ? genero = "a" : (genero == "Masculino") ? genero = "o" : genero = "e";
  return genero;
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function otroUsuario() {
  localStorage.clear();
  window.location.reload();
}
