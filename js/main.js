const inventario = [
  { nombre: "Polerón", precio: 20000, stock: 10, imagen: "media/poleron.jpg"},
  { nombre: "Pantalón", precio: 25000, stock: 15, imagen: "media/pantalon.jpg"},
  { nombre: "Beanie", precio: 10000, stock: 8, imagen: "media/beanie.jpg" },
  { nombre: "Banano", precio: 15000, stock: 10, imagen: "media/banano.jpg" },
];


let contenedor = document.getElementById("contenedor")

//Creación de los divs para meter la info de producto
for (let index = 0; index < inventario.length; index++) {
  let contenedorProducto = document.createElement("div")
  contenedor.appendChild(contenedorProducto)
  contenedorProducto.className = "colProd"
}


let producto = document.getElementsByClassName("colProd")

//Función para llamar y estructurar los datos de los productos
function datosProducto(i) {
  producto[i].innerHTML = `
  <img class="producto" src="${inventario[i].imagen}" alt=${inventario[i].nombre}>
  <h3>${inventario[i].nombre}</h3>
  <h4>$${inventario[i].precio}</h4>
  <p>Hay ${inventario[i].stock} en stock</p>
  <button>Agregar al carro</button>`

}

for (let index = 0; index < inventario.length; index++) {
  datosProducto(index) 
}
