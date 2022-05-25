

let nombre = "Vanina"
let genero = "F"
let arrResumen = []
let respCategorias = 0

// Nombre de la persona
if (typeof nombre === 'undefined') { nombre = prompt("escribe tu nombre"); }


// Calculamos el momento del dia
let fecha = new Date();
let hora = fecha.getHours();
let buenas;

if (hora >= 0 && hora < 12) {
  buenas = "buenos días";
} else if (hora >= 12 && hora < 19) {
  buenas = "buenas tardes";
} else if (hora >= 19 && hora < 24) {
  buenas = "buenas noches";
}


// Hagamoslo incluyente
if (typeof genero === 'undefined') { genero = prompt("Favor indicar como prefiere que me dirija a ud \n ( M-masculino, F-femenino y N-no definido ) "); }

if (genero == "F" || genero == "f") {
  genero = "a";
} else if (genero == "M" || genero == "m") {
  genero = "o";
} else {
  genero = "e";
}

// Bienvenida
let bienvenida = document.getElementById("bienvenida");
let saludo = document.getElementById("saludo");

let dropCategoria = document.getElementById("dropCategoria");
let pregCategoria = document.getElementById("pregCategoria");

let dropProducto = document.getElementById("dropProducto");
let pregProducto = document.getElementById("pregProducto");
let pProducto = document.getElementById("pProducto");



// -------------------------------------------
bienvenida.innerHTML = `<h1>Bienvenid${genero} a Papeleria Alfa</h1>`;
saludo.innerHTML = `<h2>Hola ${nombre}, ${buenas}</h2>`;

pregCategoria.innerHTML = `Favor de escoger una categoria`


dropCategoria.onchange = () => {
  console.log(dropCategoria.options[dropCategoria.selectedIndex].value);
  if (dropCategoria.options[dropCategoria.selectedIndex].value == 1) {
    pregProducto.innerHTML = `Favor de escoger un producto`
    pProducto.innerHTML = `
      <select id="dropProducto">
        <option value="0">Selecciona uno...</option>
        <option value="1"> Boligrafo </option>
        <option value="2"> Goma </option>
        <option value="3"> Sacapuntas </option>
      </select>`
  } else if (dropCategoria.options[dropCategoria.selectedIndex].value == 2) {
    pregProducto.innerHTML = `Favor de escoger un producto`
    pProducto.innerHTML = `
      <select id="dropProducto">
        <option value="0">Selecciona uno...</option>
        <option value="1"> Nescafe Clasico </option>
        <option value="2"> Cafe Molido </option>
        <option value="3"> Te de Hierbabuena </option>
      </select>`
  } else if (dropCategoria.options[dropCategoria.selectedIndex].value == 3) {
    pregProducto.innerHTML = `Favor de escoger un producto`
    pProducto.innerHTML = `
      <select id="dropProducto">
        <option value="0">Selecciona uno...</option>
        <option value="1"> Sanitas </option>
        <option value="2"> Papel higienico </option>
        <option value="3"> Jabon liquido </option>
      </select>`
  } else {
    pregProducto.innerHTML = ``
    pProducto.innerHTML = ``
  }
}



dropProducto.onchange = () => {

  console.log(dropProducto.options[dropProducto.selectedIndex].value);
  //   // if (dropProducto.options[dropProducto.selectedIndex].innerText === "Papelería") {
  //   // }
}


// Comprobamos el password

// let x = 0;
// if (typeof pass === 'undefined') {
//   do {
//     if (x === 3) {
//       bye("Strike: 3, OUT!!!");
//       break;
//     } else {
//       if (x > 0) {
//         alert("Strike: " + x);
//       }
//       x++;
//     }
//     pass = prompt("escribe tu contraseña");
//   } while (pass !== "123");
// }

class Producto {
  constructor(id, nombre, modelo, precio, iva, inventario, imagen) {
    this.id = id
    this.nombre = nombre
    this.modelo = modelo
    this.precio = precio
    this.iva = this.precio * (iva / 100)
    this.inventario = inventario
    this.imagen = imagen

  }
}
// creamos los productos
let boligrafo = new Producto(01, "Boligrafo", "BIC-BOL-M250CA", 12, 16, 40);
let goma = new Producto(02, "Goma", "AZO-GOM-6590", 21.35, 16, 15);
let sacapuntas = new Producto(03, "Sacapuntas", "ACO-SAC-P3888", 785.79, 16, 3);
let nescafe = new Producto(04, "Nescafe Clasico 60g", "NES-NCF-60GR", 66.35, 16, 15);
let cafe_molido = new Producto(05, "Cafe Molido Intenso Veracruz, 454g", "CAP-CAF-VER", 143.31, 16, 5);
let te_de_hierbabuena = new Producto(06, "Te De Hierbabuena", "MCC-TE-HIERB25", 37.89, 16, 14);
let sanitas = new Producto(07, "Sanitas", "LKC-TOAI-92231", 219.20, 16, 50);
let papel_higienico = new Producto(08, "Papel higienico", "TOR-HIGT-700148", 558.65, 16, 85);
let jabon_liquido = new Producto(09, "Jabon liquido", "ALF-JABON-5480", 36.79, 16, 71);



// Comienza el catalogo
// inicioCuestionario();


// console.log(fichaTecnica(boligrafo));
// function inicioCuestionario() {
//   respCategorias = parseInt(
//     prompt("Categorias: \n 1: Papelería \n 2: Cafetería  \n 3: Limpieza\n Para salir cualquier otra cosa")
//   );
//   categorias(respCategorias);
// }

// // este se encargara de resolver las categorias
// function categorias(respuesta) {
//   let respProducto;
//   if (respuesta === 1) {
//     respProducto = parseInt(prompt("Escoge que poducto de Papelería quieres que te muestre: \n 1: Boligrafo \n 2: Goma \n 3: Sacapuntas  \n Para salir cualquier otra cosa"));
//     if (respProducto == 1) { respProducto = boligrafo } else if (respProducto == 2) { respProducto = goma } else if (respProducto == 3) { respProducto = sacapuntas }

//   } else if (respuesta == 2) {
//     respProducto = parseInt(prompt("Escoge que poducto de Cafetería quieres que te muestre: \n 1: Nescafe Clasico 60g \n 2: Cafe Molido Intenso Veracruz, 454g \n 3: Te De Hierbabuena \n Para salir cualquier otra cosa"));
//     if (respProducto == 1) { respProducto = nescafe } else if (respProducto == 2) { respProducto = cafe_molido } else if (respProducto == 3) { respProducto = te_de_hierbabuena }

//   } else if (respuesta == 3) {
//     respProducto = parseInt(prompt("Escoge que poducto de Limpieza quieres que te muestre: \n 1: Sanitas\n 2: Papel higienico\n 3: Jabon liquido\n Para salir cualquier otra cosa"));
//     if (respProducto == 1) { respProducto = sanitas } else if (respProducto == 2) { respProducto = papel_higienico } else if (respProducto == 3) { respProducto = jabon_liquido }

//   }
//   // alert(fichaTecnica(respProducto));
//   arrResumen.push(respProducto);
//   respuesta = prompt(`Quieres ver otro articulo? \n S=Sí N=No`);
//   if (respuesta === "si" || respuesta === "Si" || respuesta === "sí" || respuesta === "Sí" || respuesta === "s" || respuesta === "S" || respuesta === "") {
//     inicioCuestionario();
//   } else {
//     do {
//       respuesta = parseInt(prompt("los " + arrResumen.length + " articulos que vio son:\n" + resumenVistos()));
//       if (respuesta >= 1 && respuesta <= arrResumen.length) {
//         arrResumen.splice(respuesta - 1, 1)

//       }

//     } while (respuesta >= 1 && respuesta <= arrResumen.length + 1);
//   }
// }
// bye("Bye " + nombre + ", hasta pronto!");


// function resumenVistos() {
//   let resumen = ""
//   let valorTotal = 0
//   for (i = 0; i < arrResumen.length; i++) {
//     resumen = resumen + (i + 1) + ") " + arrResumen[i].nombre + " ===> $" + arrResumen[i].precio + "\n"
//     valorTotal = valorTotal + arrResumen[i].precio
//   }
//   resumen = `${resumen}    Total:$ ${valorTotal} \nPara quitar un articulo pon el numero correspondiente o pon 0 para salir`
//   return resumen
// }



// function fichaTecnica(elemento) {
//   let ficha = " Articulo:   " + elemento.nombre +
//     "\n Modelo:     " + elemento.modelo +
//     "\n Precio:     $" + elemento.precio + " ( + $" + elemento.iva + " de I.V.A ) " +
//     "\n Inventario: " + elemento.inventario + " piezas"
//   return ficha
// }
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
