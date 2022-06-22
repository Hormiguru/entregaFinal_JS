
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

let productos = []
fetch("./json/productos.json")
  .then((response) => response.json())
  .then((data) => {
    catalogo(data)
  })


// ----------------------------------------------------  
// si no tenermos aun el nombre o el genero preferido, se lo solicitamos
console.log(`nombre ${nombre} genero ${genero}`);
if (nombre == null || genero == null) {
  contenedor.innerHTML = `<div class="d-flex justify-content-center"><form class="bg-light border border-success border-3 rounded m-5 p-2 " >
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
  window.location.reload();
  bienvenida()
}

// Inicia todo aqui
function bienvenida() {

  crearMenu("Todos")
  Swal.fire({
    icon: 'success',
    title: `Bienvenid${preferencia(genero)} a Papeleria Alfa`,
    text: `${buenas} ${nombre}`,
    footer: `<a href="javascript:otroUsuario();">Si no eres ${nombre} da click aqui</a>`
  })
}



function crearMenu(opcionActiva) {

  let botonesMenu = ""
  let nombreBoton
  let botonActivo
  for (let i = 1; i <= 4; i++) {
    if (i === 1) {
      nombreBoton = "Todos"
    } else if (i === 2) {
      nombreBoton = "Papeleria"
    } else if (i === 3) {
      nombreBoton = "Cafeteria"
    } else if (i === 4) {
      nombreBoton = "Limpieza"
    }
    if (nombreBoton === opcionActiva) { botonActivo = "active" } else { botonActivo = "" }
    botonesMenu += `<button type="button" class="btn btn-success ${botonActivo}"id="btn-${nombreBoton}" onClick="filtradoProductos('${nombreBoton}')">${nombreBoton}</button>`
  }
  if ("Carrito" === opcionActiva) {
    botonActivo = "active";
  } else {
    botonActivo = ""
  }
  contenedor.innerHTML = `
  <div class="m-2 p-2 ">
    <div class="btn-group" role="group" aria-label="Basic example">
    ${botonesMenu}
    </div>
    <button type="button" class="btn btn-success "id="btn-verCarrito ${botonActivo}" onClick="verCarrito()">Ver 
    carrito</button>
  </div>
  `

}




function filtradoProductos(categoria) {
  let filtrado
  fetch("./json/productos.json")
    .then((response) => response.json())
    .then((data) => {
      productos = data
    })
  filtrado = productos
  if (categoria != "Todos") {
    filtrado = productos.filter(producto => producto.categoria == categoria);
  }
  crearMenu(categoria)
  document.getElementById("carrito").style.display = 'none';
  catalogo(filtrado)
}

// arrancamos el catalogo
function catalogo(data) {
  productos = data
  let tar = document.createElement("div");
  tar.classList.add("row", "row-cols-auto", "justify-content-around", "m-2", "p-2");
  contenedor.appendChild(tar);
  productos.forEach((producto) => {

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
          Inventario: ${producto.inventario}<br>
          Descripcion:<br>
          ${producto.descripcion}<br>
          </p>
          <p class="card-text"></p>
          <a href="#cart" class="btn btn-success" onClick="agregarAlCarrito(${producto.id - 1})">Comprar</a>
        </div>
          `;
    card.innerHTML = html;
    if (nombre !== null || genero !== null) {
      tar.appendChild(card);
    }
  });
}

let modalCarrito = document.getElementById("carrito");
const agregarAlCarrito = (idProducto) => {
  //findIndex devuelve el indice del elemento encontrado
  // si no encuentra nada devuelve menos 1 (-1)
  const idEncontrado = cart.findIndex((elemento) => {
    return elemento.id === productos[idProducto].id;
  });
  if (idEncontrado === -1) {
    //agrego el producto
    const productoAgregar = productos[idProducto];
    productoAgregar.cantidad = 1;
    cart.push(productoAgregar);

    toasty(`${productoAgregar.nombre} agregado`);
  } else {
    //incremento cantidad
    cart[idEncontrado].cantidad += 1;
    toasty(`${productos[idProducto].nombre} agregado`);
  }
};
const verCarrito = () => {
  document.getElementById("carrito").style.display = 'block';
  crearMenu("Carrito")
  let total = 0;
  modalCarrito.className = "carrito";
  modalCarrito.innerHTML = "";
  // para que el boton de - no aparesca si es 1 elemento
  let btnLess
  if (cart.length > 0) {
    cart.forEach((producto, indice) => {
      total = total + producto.precio * producto.cantidad;
      if (producto.cantidad > 1) {
        btnLess = `<button type="button" class="btn btn-primary" id="less-product" onClick="removeOne(${indice})">-</button>`
      } else {
        btnLess = ""
      }
      const carritoContainer = document.createElement("div");
      carritoContainer.className = "producto-carrito";
      carritoContainer.innerHTML = `
        <img class="car-img" src="./Img/productos/${producto.id}.jpg"/>
        <div class="product-details">
          ${producto.nombre}
        </div>
        <div class="product-details" > Cantidad: ${producto.cantidad} ${btnLess}
        <button type="button" class="btn btn-danger"id="less-product" onClick="addOne(${indice})">+</button></div>
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
  toasty(`${cart[indice].nombre} Eliminado`)
  cart.splice(indice, 1);
  verCarrito();
};

const removeOne = (indice) => {
  toasty(`-1 ${cart[indice].nombre}`)
  cart[indice].cantidad -= 1
  verCarrito();
};
const addOne = (indice) => {
  toasty(`+1 ${cart[indice].nombre}`)
  cart[indice].cantidad += 1
  verCarrito();
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
function toasty(texto) {
  Toastify({
    text: texto,
    oldestFirst: true,
    duration: 4000,
    newWindow: true,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    onClick: function () { }, // Callback after click
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();

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

