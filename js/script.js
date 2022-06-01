

let nombre = localStorage.getItem("nombreUsuario")
let genero = localStorage.getItem("generoUsuario")
let arrResumen = []
let respCategorias = 0

// Nombre de la persona
if (nombre == null) {
  nombre = prompt("escribe tu nombre");
  localStorage.setItem("nombreUsuario", nombre);
}

// Calculamos el momento del dia
let fecha = new Date();
let hora = fecha.getHours();
let buenas;

// if ternerario condition ? exprIfTrue : exprIfFalse
(hora >= 0 && hora < 12) ? buenas = "buenos días" : (hora >= 12 && hora < 19) ? buenas = "buenas tardes" : buenas = "buenas noches";

// Hagamoslo incluyente
if (genero == null) {
  genero = prompt("Favor indicar como prefiere que me dirija a ud \n ( M-masculino, F-femenino y N-no definido ) ");
  (genero == "F" || genero == "f") ? genero = "a" : (genero == "M" || genero == "m") ? genero = "o" : genero = "e";
  localStorage.setItem("generoUsuario", genero);
}



// Bienvenida
let bienvenida = document.getElementById("bienvenida");
let saludo = document.getElementById("saludo");

let dropCategoria = document.getElementById("dropCategoria");
let pregCategoria = document.getElementById("pregCategoria");

let dropProducto = document.getElementById("dropProducto");
let pregProducto = document.getElementById("pregProducto");
let pProducto = document.getElementById("pProducto");
let card = document.getElementById("card");


// -------------------------------------------
bienvenida.innerHTML = `<h1>Bienvenid${genero} a Papeleria Alfa</h1>`;
saludo.innerHTML = `<h2>Hola ${nombre}, ${buenas}</h2>`;

pregCategoria.innerHTML = `Favor de escoger una categoria`


dropCategoria.onchange = () => {
  console.log(dropCategoria.options[dropCategoria.selectedIndex].value);
  if (dropCategoria.options[dropCategoria.selectedIndex].value == "Papelería") {
    pregProducto.innerHTML = `Favor de escoger un producto`
    pProducto.innerHTML = `
    <select id="dropProducto", onChange="creaCard(options[selectedIndex].innerText,options[selectedIndex].value)">
        <option value="0">Selecciona uno...</option>
        <option value=1> Boligrafo </option>
        <option value=2> Goma </option>
        <option value=3> Sacapuntas </option>
      </select>`
  } else if (dropCategoria.options[dropCategoria.selectedIndex].value == "Cafetería") {
    pregProducto.innerHTML = `Favor de escoger un producto`
    pProducto.innerHTML = `
    <select id="dropProducto", onChange="creaCard(options[selectedIndex].innerText,options[selectedIndex].value)">
        <option value="0">Selecciona uno...</option>
        <option value=4> Nescafe Clasico </option>
        <option value=5> Cafe Molido </option>
        <option value=6> Te de Hierbabuena </option>
      </select>`
  } else if (dropCategoria.options[dropCategoria.selectedIndex].value == "Limpieza") {
    pregProducto.innerHTML = `Favor de escoger un producto`
    pProducto.innerHTML = `
      <select id="dropProducto", onChange="creaCard(options[selectedIndex].innerText,options[selectedIndex].value)">
        <option value="0">Selecciona uno...</option>
        <option value=7> Sanitas </option>
        <option value=8> Papel higienico </option>
        <option value=9> Jabon liquido </option>
      </select>`
  } else {
    pregProducto.innerHTML = ``
    pProducto.innerHTML = ``
  }
}
const contenedor = document.getElementById("cardContainer");
// contenedor.innerHTML = "";
const cardInfo = document.createElement("div");

// los productos
let productos = [
  {
    id: 01,
    nombre: "Boligrafo",
    modelo: "BIC-BOL-M250CA",
    precio: 12,
    inventario: 40,
  },
  {
    id: 02,
    nombre: "Goma",
    modelo: "AZO-GOM-6590",
    precio: 21.35,
    inventario: 15,
  },
  {
    id: 03,
    nombre: "Sacapuntas",
    modelo: "ACO-SAC-P3888",
    precio: 785.79,
    inventario: 3,
  },
  {
    id: 04,
    nombre: "Nescafe Clasico 60g",
    modelo: "NES-NCF-60GR",
    precio: 66.35,
    inventario: 16,
  },
  {
    id: 05,
    nombre: "Cafe Molido Intenso Veracruz, 454g",
    modelo: "CAP-CAF-VER",
    precio: 143.31,
    inventario: 22,
  },
  {
    id: 06,
    nombre: "Te De Hierbabuena",
    modelo: "MCC-TE-HIERB25",
    precio: 37.89,
    inventario: 10,
  },
  {
    id: 07,
    nombre: "Sanitas",
    modelo: "LKC-TOAI-92231",
    precio: 219.20,
    inventario: 50,
  },
  {
    id: 08,
    nombre: "Papel higienico",
    modelo: "TOR-HIGT-700148",
    precio: 558.65,
    inventario: 100,
  },
  {
    id: 09,
    nombre: "Jabon liquido",
    modelo: "ALF-JABON-5480",
    precio: 36.79,
    inventario: 78,
  },
]

function creaCard(nombre, id) {
  console.log("nombre" + nombre);
  console.log("id" + id)
  let findProducto = productos.find(elemento => elemento.id == id)
  console.log(findProducto);
  cardInfo.className = "card"
  cardInfo.style = "width: 18rem;"
  cardInfo.innerHTML = `
  <img src="./Img/productos/${findProducto.id}.jpg" alt="${findProducto.nombre}">
  <div class="card-body">
    <h5 class="card-title">${findProducto.nombre}</h5>
    <p class="card-text">Modelo: ${findProducto.modelo}</p>
    <p class="card-text">Precio: ${findProducto.precio}</p>
    <p class="card-text">Iva: 16% (`+ findProducto.precio * (16 / 100) + `)</p>
    <p class="card-text">Inventario: ${findProducto.inventario}</p>
    <p class="card-text"></p>
    <p class="card-text"></p>
  </div>
`
  contenedor.appendChild(cardInfo);
  // card.innerHTML = cardInfo
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
function bye(mensaje) {
  // alert(mensaje);
}
