//Datos de los productos
const inventario = [
  { nombre: "Polerón", precio: 20000, stock: 10, imagen: "media/poleron.jpg", id:01},
  { nombre: "Pantalón", precio: 25000, stock: 15, imagen: "media/pantalon.jpg", id:02},
  { nombre: "Beanie", precio: 10000, stock: 8, imagen: "media/beanie.jpg", id:03 },
  { nombre: "Banano", precio: 15000, stock: 10, imagen: "media/banano.jpg", id:04 },
];


let contenedor = document.getElementById("contenedor")

//Creación de los divs para meter la info de producto
for (let i = 0; i < inventario.length; i++) {
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
  <button class="agregarCarro">Agregar al carro</button>`

  //Módulo oculto para añadir cantidad
  let cantidad = document.createElement("div")
  cantidad.innerHTML = `<p>Selecciona la cantidad</p>
  <input type="number" name="cantidad" value="0"></input>
  <button class="agregar">Agregar</button> 
  <span class="material-icons cancelar">
  clear
  </span>`

  producto[i].appendChild(cantidad)
  cantidad.className = "cantidad"
  cantidad.style.display = "none"
}

//Iterador para ir llenando los datos de productos
for (let i = 0; i < inventario.length; i++) {
  datosProducto(i) 
}


//Mostrar y ocultar carro de compras
let iconoCarro = document.getElementById("carrito"), detalleCarro = document.createElement("div")

document.body.append(detalleCarro)

detalleCarro.className = "detalleCarro"
detalleCarro.innerHTML = ` 
<div class="headerCarro">
<h3>Carro de compras</h3>
<span class="material-icons cerrar" id="cerrarCarro">
close
</span></div>
<div id="prodCarro"></div>
`

iconoCarro.onclick = () =>{
  detalleCarro.style.right = "0"
}

let cerrarCarro = document.getElementById("cerrarCarro")

cerrarCarro.onclick = () =>{
  detalleCarro.style.right = "-31vw"
}


//Función agregar al carro + cantidad
let agregarCarro = document.querySelectorAll(".agregarCarro"),selectCantidad = document.querySelectorAll(".cantidad"), agregarCantidad = document.querySelectorAll(".agregar"),
cancelar = document.querySelectorAll(".material-icons.cancelar"), inputCantidad = document.querySelectorAll("[type=number]")

let carroCompras = []

let contProdCarro = document.getElementById("prodCarro") 

function armarCarro (i) {
    let totalProd = inventario[i].precio * parseInt(inputCantidad[i].value)

    let filaProdCarro = document.createElement("div")

    filaProdCarro.className = "itemCarro"
    filaProdCarro.innerHTML = `
      <img class="imgProdCarro" src="${inventario[i].imagen}" alt=${inventario[i].nombre}>
      <p>${inventario[i].nombre}</p>
      <p>${parseInt(inputCantidad[i].value)}</p>
      <p>$${totalProd}</p>
      `
    contProdCarro.appendChild(filaProdCarro)
} 


//Funcionallidades de los eventos del botón agregar
function btnCarro (i){
  agregarCarro[i].onclick = () =>{
    agregarCarro[i].style.display = "none"
    selectCantidad[i].style.display = "inline-block"
  }

  agregarCantidad[i].onclick = () =>{
    armarCarro(i)
    agregarCantidad[i].innerHTML = "Producto agregado"
    inventario[i]["cantidad"] = parseInt(inputCantidad[i].value)
    inventario[i]["total"] = inventario[i].precio * parseInt(inputCantidad[i].value)
    carroCompras.push(inventario[i]) 
    localStorage.setItem('Carro', JSON.stringify(carroCompras))
  }

  agregarCantidad[i].onmouseleave = () =>{
    agregarCantidad[i].innerText = "Agregar"
  }

  cancelar[i].onclick = () =>{
    agregarCarro[i].style.display = "inline-block"
    selectCantidad[i].style.display = "none"  
  }  
}

//Iterar funcionalidad por cada botón agregar que hay
for (let i = 0; i < agregarCarro.length; i++){
    btnCarro(i)
}


//Email descuento 
let emailDescuento = document.getElementById("emailDesc"), guardarEmail = document.getElementById("guardarEmail")

guardarEmail.onclick = () =>{
  emailDescuento.style.display = "none"
  localStorage.setItem("Email cliente", emailDescuento.value)
  guardarEmail.innerText = "Tu código es COMPRA10%"
}
