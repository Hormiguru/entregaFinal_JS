
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
        <div class="product-details"> Precio: $`+ parseFloat(producto.precio).toFixed(2)+`</div>
        <div class="product-details"> Subtotal: $ `+parseFloat(producto.precio * producto.cantidad).toFixed(2)+`</div>
        <button class="btn btn-danger"  id="remove-product" onClick="removeProduct(${indice})">Eliminar producto</button>
         `;
      modalCarrito.appendChild(carritoContainer);
    });
    // Dibujo el total y lo appendeo en el div capturado y guardado en la variable modalCarrito
    const totalContainer = document.createElement("div");
    totalContainer.className = "total-carrito";
    totalContainer.innerHTML = `<div class= "total"> TOTAL $ ` +parseFloat(total).toFixed(2) + `</div>
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

console.log(`es el nombre ${nombre}`);
console.log(`es el genero ${genero}`);
console.log(`es el buenas ${buenas}`);









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

// // Hagamoslo incluyente
// if (genero == null) {
//   genero = prompt("Favor indicar como prefiere que me dirija a ud \n ( M-masculino, F-femenino y N-no definido ) ");
//   localStorage.setItem("generoUsuario", genero);
// }



// // Bienvenida
// let bienvenida = document.getElementById("bienvenida");
// let saludo = document.getElementById("saludo");

// let dropCategoria = document.getElementById("dropCategoria");
// let pregCategoria = document.getElementById("pregCategoria");

// let dropProducto = document.getElementById("dropProducto");
// let pregProducto = document.getElementById("pregProducto");
// let pProducto = document.getElementById("pProducto");
// let card = document.getElementById("card");


// // -------------------------------------------


// pregCategoria.innerHTML = `Favor de escoger una categoria`


// dropCategoria.onchange = () => {
//   console.log(dropCategoria.options[dropCategoria.selectedIndex].value);
//   if (dropCategoria.options[dropCategoria.selectedIndex].value == "Papelería") {
//     pregProducto.innerHTML = `Favor de escoger un producto`
//     pProducto.innerHTML = `
//     <select id="dropProducto", onChange="creaCard(options[selectedIndex].innerText,options[selectedIndex].value)">
//         <option value="0">Selecciona uno...</option>
//         <option value=1> Boligrafo </option>
//         <option value=2> Goma </option>
//         <option value=3> Sacapuntas </option>
//       </select>`
//   } else if (dropCategoria.options[dropCategoria.selectedIndex].value == "Cafetería") {
//     pregProducto.innerHTML = `Favor de escoger un producto`
//     pProducto.innerHTML = `
//     <select id="dropProducto", onChange="creaCard(options[selectedIndex].innerText,options[selectedIndex].value)">
//         <option value="0">Selecciona uno...</option>
//         <option value=4> Nescafe Clasico </option>
//         <option value=5> Cafe Molido </option>
//         <option value=6> Te de Hierbabuena </option>
//       </select>`
//   } else if (dropCategoria.options[dropCategoria.selectedIndex].value == "Limpieza") {
//     pregProducto.innerHTML = `Favor de escoger un producto`
//     pProducto.innerHTML = `
//       <select id="dropProducto", onChange="creaCard(options[selectedIndex].innerText,options[selectedIndex].value)">
//         <option value="0">Selecciona uno...</option>
//         <option value=7> Sanitas </option>
//         <option value=8> Papel higienico </option>
//         <option value=9> Jabon liquido </option>
//       </select>`
//   } else {
//     pregProducto.innerHTML = ``
//     pProducto.innerHTML = ``
//   }
// }
// const contenedor = document.getElementById("cardContainer");
// // contenedor.innerHTML = "";
// const cardInfo = document.createElement("div");


// function creaCard(nombre, id) {
//   console.log("nombre" + nombre);
//   console.log("id" + id)
//   let findProducto = productos.find(elemento => elemento.id == id)
//   console.log(findProducto);
//   cardInfo.className = "card"
//   cardInfo.style = "width: 18rem;"
//   cardInfo.innerHTML = `
//   <img src="./Img/productos/${findProducto.id}.jpg" alt="${findProducto.nombre}">
//   <div class="card-body">
//     <h5 class="card-title">${findProducto.nombre}</h5>
//     <p class="card-text">Modelo: ${findProducto.modelo}</p>
//     <p class="card-text">Precio: ${findProducto.precio}</p>
//     <p class="card-text">Iva: 16% (`+ findProducto.precio * (16 / 100) + `)</p>
//     <p class="card-text">Inventario: ${findProducto.inventario}</p>
//     <p class="card-text"></p>
//     <p class="card-text"></p>
//   </div>
// `
//   contenedor.appendChild(cardInfo);
//   // card.innerHTML = cardInfo
// }



// // solo para el desafio, no encuentro donde poner estas cosas
// document.getElementById("botonClick").addEventListener("click", function () {
//   Swal.fire({
//     position: 'top-end',
//     icon: 'success',
//     title: 'Te dije que no lo hicieras!!!',
//     showConfirmButton: false,
//     timer: 1500
//   })
// });
// // puede servir para un futuro


// La tarjeta de DCM|
// <div id="ficha_tecnica" class="wid100-700px col-sm-12 col-lg-12 box">

// <div class="row">
  



//   <!------->
//   <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">

//     <div id="producto_imagen">
     
//               <strong class=""></strong>
            
//       <table border="0" cellspacing="3" cellpadding="0">
//         <tbody><tr>
//           <td><a href="/ficha/ficha.sp?itemNum=AZO-PUN-6405&amp;opc=1" class="product-image"> 
//               <!--<img width="130" src="/resources/images/hp1.jpg"  alt="">--->

//               <img src="/MyFotos/large/(L)AZO-PUN-6405.jpg" width="130">
//           </a></td>
//         </tr>
//         <tr>
//           <td><a class="DC-clave" href="/ficha/ficha.sp?itemNum=AZO-PUN-6405&amp;opc=1">AZO-PUN-6405</a>
//             </td>
//         </tr>
//         <tr>
//           <td class="Upc">UPC: 7501428769096</td>
//         </tr>

//         <tr>
//           <td class="clavep">Clave/P:
//             301.6405</td>
//         </tr>

        
//       </tbody></table>
//       <!-- Aquí termina table class="foto"-->
//     </div>
//     <!--Aquí termina div id="producto_imagen"-->
                          
    
//     <!-- 			Validación HP-CONNECT -->
    
      
    

    

//     <!-- -ETIQUETAS TIPO OUTLET-- -->
    
      
      
      
    



//   </div>


//   <div class="col-xs-12 col-sm-9 col-md-9 col-lg-9">

//     <div id="producto_info">
//       <table>
//         <tbody><tr>
//           <td colspan="8" class="desc1">PUNTILLAS PARA LAPICERO 0.5MM AZOR
             
//               <strong class=""></strong>
            
//           </td>
//         </tr>
//         <tr>
//           <td colspan="8" class="desc2"><b>1 TUBO</b>
//             <br>PUNTILLAS 0.5 MM, GRADO HB, ENVASE CON TAPA QUE NO SE PIERDE.</td>
//         </tr>
//       </tbody></table>
//     </div>
//     <!-- Aquí termina div id="producto_info"-->



    

    

    



//     <div id="info_precios">
      
        
        
        
        
        
        
//           <table border="0" style="width: 100%; font-size: 12px;">
//             <tbody><tr>
//               <td class="titulo_tabla">Precio Lista</td>
//               <!-- MULTIPLOS -->
              
                

                
                

                
//                   <td class="titulo_tabla">Costo Dist</td>
                
              
              
//               <td class="titulo_tabla">Existencia</td>
//               <!-- <td class="titulo_tabla">Margen</td>  -->
//               <td class="titulo_tabla">Cantidad</td>
              
//             </tr>
//             <tr>
              
//               <td>
                  
                    
                      
                      
//   $ 7.47
                      
                    
                  
                  
//                 </td>
              
                
                

                
                

                
//                   <td>
                      
//     $ 5.30
                      
                      
//                     </td>
                
              

              
              
                
                  
//                     <td>	
                        
//                       <span class="clase_ANAHUAC" style="color: #06F">
//                         ANAHUAC </span> (316)
//                     </td>
                  
                
                
              
//               <!-- 
// <td>
// 20.00%
// </td>
// -->
//               <td><input type="hidden" value="AZO-PUN-6405" name="itemNum" id="itemNum"> <input type="hidden" value="" name="abcClass" id="abcClass"> 
                  
                  
                  
                  
//                     <span id="cantidadUser1">
//                       <input class="cat-art" type="text" value="" onkeypress="return noEnter(event,1);" maxlength="5" name="cantidad" id="cantidad-1" size="4" onchange="validaCantidadMaxima('AZO-PUN-6405', 1);">
//                       <input type="hidden" name="bundle" value="">
//                       <input type="hidden" name="idPromo" value="">
//                       <input type="hidden" name="multiplo" value="">
//                       <input type="hidden" name="precioMultiplo" value="">
//                       <input type="hidden" name="unidadMedida" value="">
//                     </span>
                  
//                  <span id="ex1" style="display: none;">658.0</span>
//               </td>
              
//             </tr>
//             <tr>
//               <td></td>

              
//                 <td id="unitarioTD1" style=""></td>
              

              

              
                
                

                
                
              
              
              
                
                  
//                     <td>	
                        
//                       <span class="clase_CEYLAN" style="color: #0C3">
//                         CEYLAN </span> (342)
//                     </td>
                  
                
                
              
//               <td></td>
//               <td></td>

//             </tr>
//             <tr>
              
//                 <td></td>
              
//               <td></td>
              
//               <td></td>
//               <td></td>
//             </tr>

//           </tbody></table>
          


          
//           <!-- BUNDLE -->


        

      

//     </div>
//     <!-- Aquí termina div id="info_precios"-->




//     <div id="alertas_producto">
      
        
        
        
        
        
        

//           <div class="row">



//             <div class="col-xs-12 col-lg-8">
              

//                 <div id="alertas_botones">
//                   <!--<div class="alerta1">
// img  src="/images/alerta/alerta1.png"
// </div>-->
//                   <!-- <div class="alerta1">
// img  src="/images/alerta/alerta2.png"
// </div>-->

//                   <!-- <div class="alerta1">
// img  src="/images/alerta/alerta4.png"
// </div>-->
//                   <!-- <div class="alerta1">
// img  src="/images/alerta/alerta5.png"> 
// <input type="hidden" name="catalogo" id="catalogo" value="AZO-PUN-6405"
// </div>-->

//                   <div class="agr-cat">
//                     <input type="checkbox" name="catalogo" id="catalogo" value="AZO-PUN-6405"> <span>

//                       <a href="#" onclick="return muestraCatalagosDist();">
//                         <i class="fa fa-book fa-lg bigger" aria-hidden="true"></i>
//                         <span title="Agregar a catalogo" class="nombre2">Catálogo</span>
//                     </a>
//                     </span>
//                   </div>
//                   <div class="ped-fav">
                    
//                     <input type="checkbox" id="listas" name="pedidoFav" value="AZO-PUN-6405$1">
//                     <span> 
//                       <a href="#" onclick="return muestraMenuUsuariosPedidoFav();">
//                         <i class="fa fa-book fa-lg bigger" aria-hidden="true"></i>
//                         <span title="Agregar a Lista de Favoritos " class="nombre2">Listas</span>
//                       </a>
//                     </span>
//                   </div>																		
                  
//                   <div class="prod-fav">
                                                          
//                     <span class="btnsfav inactive" onclick="" id="AZO-PUN-6405"> 																																								 
//                       <i title="Agregar a Favoritos" id="AZO-PUN-6405$1" class="fa fa-heart fa-lg bigger   heartFavs" aria-hidden="true"></i><span class="sr-only">Agregar a Favoritos</span>																				
//                       <a title="Agrega a Producto Favorito ">Favoritos</a>				
//                     </span>
//                   </div>
//                 </div>
//                 <!-- Aquí termina div id="alertas"-->
              
//             </div>

//             <div class="col-xs-12 col-lg-4">
//               <div id="comprar">
                
                
                  
                  
//                     <div id="boton_compra" onclick="return validaCantidad(1, 658.0, 5.3);">
//                       <a href="#"><i class="fi-rr-shopping-cart-add"></i>&nbsp;COMPRAR</a>
//                     </div>
                  
                
                
//               </div>
//             </div>


//           </div>

        
      
//     </div>
//     <!-- Aquí termina div id="alertas_producto"-->

//   </div>
//   <!-- -10 COLUMNAS- -->

// </div>
// </div>