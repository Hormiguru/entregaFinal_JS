

let nombre //= "Vanina"
let genero //= "F"
let pass //= "123"
let arrResumen = []
console.log(nombre + genero + pass)
// Nombre de la persona
if (typeof nombre === 'undefined') { nombre = prompt("escribe tu nombre"); }


// Calculamos el momento del dia
let fecha = new Date();
let hora = fecha.getHours();
let buenas;

if (hora >= 0 && hora < 12) {
  buenas = "Buenos días";
} else if (hora >= 12 && hora < 19) {
  buenas = "Buenas tardes";
} else if (hora >= 19 && hora < 24) {
  buenas = "Buenas noches";
}
alert(buenas + " " + nombre);

// Hagamoslo incluyente
if (typeof genero === 'undefined') { genero = prompt("Favor indicar como prefiere que me dirija a ud \n ( M-masculino, F-femenino y N-no definido ) "); }

if (genero == "F" || genero == "f") {
  genero = "a";
} else if (genero == "M" || genero == "m") {
  genero = "o";
} else {
  genero = "e";
}

// Comprobamos el password

let x = 0;
if (typeof pass === 'undefined') {
  do {
    if (x === 3) {
      bye("Strike: 3, OUT!!!");
      break;
    } else {
      if (x > 0) {
        alert("Strike: " + x);
      }
      x++;
    }
    pass = prompt("escribe tu contraseña");
  } while (pass !== "123");
}

// creamos los productos
let boligrafo = new PRODUCTO("Boligrafo", "BIC-BOL-M250CA", 12, 16, 40);
let goma = new PRODUCTO("Goma", "AZO-GOM-6590", 21.35, 16, 15);
let sacapuntas = new PRODUCTO("Sacapuntas", "ACO-SAC-P3888", 785.79, 16, 3);
let nescafe = new PRODUCTO("Nescafe Clasico 60g", "NES-NCF-60GR", 66.35, 16, 15);
let cafe_molido = new PRODUCTO("Cafe Molido Intenso Veracruz, 454g", "CAP-CAF-VER", 143.31, 16, 5);
let te_de_hierbabuena = new PRODUCTO("Te De Hierbabuena", "MCC-TE-HIERB25", 37.89, 16, 14);
let sanitas = new PRODUCTO("Sanitas", "LKC-TOAI-92231", 219.20, 16, 50);
let papel_higienico = new PRODUCTO("Papel higienico", "TOR-HIGT-700148", 558.65, 16, 85);
let jabon_liquido = new PRODUCTO("Jabon liquido", "ALF-JABON-5480", 36.79, 16, 71);

if (pass === "123") {
  alert("Hola " + nombre + ", " + "bienvenid" + genero + " a Papeleria Alfa ");
  // Comienza el catalogo
  inicioCuestionario();
} else {
  alert("Nos vemos pronto");
}

// console.log(fichaTecnica(boligrafo));

function inicioCuestionario() {
  let respCategorias = parseInt(
    prompt("Categorias: \n 1: Papelería \n 2: Cafetería  \n 3: Limpieza\n Para salir cualquier otra cosa")
  );
  categorias(respCategorias);
}

// este se encargara de resolver las categorias
function categorias(respuesta) {
  let respProducto;
  if (respuesta === 1) {
    respProducto = parseInt(prompt("Escoge que poducto de Papelería quieres que te muestre: \n 1: Boligrafo \n 2: Goma \n 3: Sacapuntas  \n Para salir cualquier otra cosa"));
    if (respProducto == 1) { respProducto = boligrafo } else if (respProducto == 2) { respProducto = goma } else if (respProducto == 3) { respProducto = sacapuntas }

  } else if (respuesta == 2) {
    respProducto = parseInt(prompt("Escoge que poducto de Cafetería quieres que te muestre: \n 1: Nescafe Clasico 60g \n 2: Cafe Molido Intenso Veracruz, 454g \n 3: Te De Hierbabuena \n Para salir cualquier otra cosa"));
    if (respProducto == 1) { respProducto = nescafe } else if (respProducto == 2) { respProducto = cafe_molido } else if (respProducto == 3) { respProducto = te_de_hierbabuena }

  } else if (respuesta == 3) {
    respProducto = parseInt(prompt("Escoge que poducto de Limpieza quieres que te muestre: \n 1: Sanitas\n 2: Papel higienico\n 3: Jabon liquido\n Para salir cualquier otra cosa"));
    if (respProducto == 1) { respProducto = sanitas } else if (respProducto == 2) { respProducto = papel_higienico } else if (respProducto == 3) { respProducto = jabon_liquido }

  }
  alert(fichaTecnica(respProducto));
  arrResumen.push(respProducto);
  respuesta = prompt("Quieres ver otro articulo? \n S=Sí N=No");
  if (respuesta === "si" || respuesta === "Si" || respuesta === "sí" || respuesta === "Sí" || respuesta === "s" || respuesta === "S") {
    inicioCuestionario();
  } else {
    do {
      respuesta = parseInt(prompt("los " + arrResumen.length + " articulos que vio son:\n" + resumenVistos()));
      if (respuesta >= 1 && respuesta < arrResumen.length) {
        arrResumen.splice(respuesta - 1, 1)

      }
    } while (respuesta >= 1 && respuesta <= arrResumen.length);
  }
}
bye("Bye " + nombre + ", hasta pronto!");


function resumenVistos() {
  let resumen = ""
  for (i = 0; i < arrResumen.length; i++) {
    resumen = resumen + (i + 1) + ") " + arrResumen[i].nombre + " ===> $" + arrResumen[i].precio + "\n"
  }
  resumen = resumen + "Para quitar uno pon el numero correspondiente"
  return resumen
}
function PRODUCTO(nombre, modelo, precio, iva, inventario) {
  this.nombre = nombre;
  this.modelo = modelo;
  this.precio = precio;
  this.iva = this.precio * (iva / 100);
  this.inventario = inventario;
}



function fichaTecnica(elemento) {
  let ficha = " Articulo:   " + elemento.nombre +
    "\n Modelo:     " + elemento.modelo +
    "\n Precio:     $" + elemento.precio + " ( + $" + elemento.iva + " de I.V.A ) " +
    "\n Inventario: " + elemento.inventario + " piezas"
  return ficha
}
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
function bye(mensaje) {
  alert(mensaje);
}
