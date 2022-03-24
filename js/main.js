let carroCompras = [];

let contenedor = document.getElementById("contenedor");

//LLamar productos
async function productos() {
  const respuesta = await fetch("./js/productos.json")
  const productos = await respuesta.json()

  productos.forEach((prod) => {
    let { imagen, nombre, precio, stock, id } = prod, 
    contenedorProd = document.createElement("div")
    
    contenedorProd.className = "colProd"
    contenedorProd.innerHTML += `
           <img class="producto" src=${imagen}>
           <h3>${nombre}</h3>   
           <h4>${numeral(precio).format("($00.000)")}</h4>
           <p>Hay ${stock} en stock</p>
           <button class="agregarCarro" id="agregar${id}">Agregar al carro</button>`

    contenedor.appendChild(contenedorProd)

    let agregarProd = document.getElementById(`agregar${id}`)

    agregarProd.onclick = () => {
      agregarCarro(id);

      Toastify({
        text: "😎 Producto agregado al carro",
        gravity: "bottom",
        className: "toast",
        style: {
          background: "#00b09b",
        },
      }).showToast();
    };
  });
}

productos();

//Abrir y cerrar carro
let iconoCarro = document.getElementById("carrito"),
  detalleCarro = document.createElement("div");
document.body.append(detalleCarro);
detalleCarro.className = "detalleCarro";
detalleCarro.innerHTML = ` 
    <div class="headerCarro">
    <h3>Carro de compras</h3>
    <span class="material-icons cerrar" id="cerrarCarro">
    close
    </span></div>
    <div id="prodCarro"></div>
`;

iconoCarro.onclick = () => {
  detalleCarro.style.right = "0";
};

let cerrarCarro = document.getElementById("cerrarCarro");

cerrarCarro.onclick = () => {
  detalleCarro.style.right = "-100vw";
};


//Crear elementos para info del carro
let contProdCarro = document.getElementById("prodCarro"), carroVacio = document.createElement("p"),
  totalCompra = document.createElement("div")


carroVacio.className = "carroVacio"
totalCompra.className = "total"

contProdCarro.appendChild(carroVacio),
  detalleCarro.appendChild(totalCompra)


//Agregar productos al carro
async function agregarCarro(id) {
  const respuesta = await fetch("./js/productos.json")
  const productos = await respuesta.json()

  let prodRepetido = carroCompras.find((buscar) => buscar.id == id);
 
  if (prodRepetido) {
    prodRepetido.cantidad = parseInt(prodRepetido.cantidad) + 1

    document.getElementById(
      `cantidad${prodRepetido.id}`
    ).innerHTML = `<p id="cantidad${prodRepetido.id}">${prodRepetido.cantidad}</p>`

    document.getElementById(
      `precio${prodRepetido.id}`
    ).innerHTML = `<p id="precio${prodRepetido.id}">${numeral(prodRepetido.precio * prodRepetido.cantidad).format("($00.000)")}</p> `

    carroVacio.style.display = "none"
    totalCarro()
  

  //Límite stock
  let btnAgregar = document.getElementById(`agregar${prodRepetido.id}`)

     if (prodRepetido.cantidad == prodRepetido.stock) {
      btnAgregar.style.pointerEvents = "none"
      btnAgregar.innerText = "Sin stock"
   
        Toastify({
          text: "No hay más stock disponible",
          gravity: "bottom",
          className: "toast",
          style: {
            background: "#ff8585",
          },
        }).showToast()
      }      

  } else {
    let agregarProd = productos.find((elemento) => elemento.id == id);
    carroCompras.push(agregarProd)

    carroVacio.style.display = "none"
    totalCarro()
    comprar()

    let filaProdCarro = document.createElement("div");
    filaProdCarro.className = "itemCarro";
    filaProdCarro.innerHTML = `
            <img class="imgProdCarro" src="${agregarProd.imagen}" alt=${agregarProd.nombre}>
                      <p>${agregarProd.nombre}</p>
                      <p id="cantidad${agregarProd.id}">${agregarProd.cantidad}</p>
                      <p id="precio${agregarProd.id}">${numeral(agregarProd.precio * agregarProd.cantidad).format("($00.000)")}</p> 
                      <span class="material-icons eliminar" id="btnEleminar${agregarProd.id}">
              close
              </span>
                     `
    contProdCarro.appendChild(filaProdCarro)
  

    //Eliminar productos
    let eliminarProd = document.getElementById(`btnEleminar${agregarProd.id}`);

    eliminarProd.onclick = () => {
      if (agregarProd.cantidad == 1) {
        eliminarProd.parentElement.remove();

        carroCompras = carroCompras.filter((item) => item.id != agregarProd.id);

        comprar()
        vacio()
        totalCarro()
        
        localStorage.setItem("carrito", JSON.stringify(carroCompras));

      } else {
        agregarProd.cantidad = agregarProd.cantidad - 1;

        document.getElementById(
          `cantidad${agregarProd.id}`
        ).innerHTML = `<p id="cantidad${agregarProd.id}">${agregarProd.cantidad}</p>`;

        document.getElementById(
          `precio${agregarProd.id}`
        ).innerHTML = `<p id="precio${agregarProd.id}">${numeral(agregarProd.precio * agregarProd.cantidad).format("($00.000)")}</p> `
      
       //Activar botón agregar productos
        let btnAgregar = document.getElementById(`agregar${agregarProd.id}`)

        agregarProd.cantidad < agregarProd.stock &&
         (btnAgregar.style.pointerEvents="auto", 
         btnAgregar.innerText = "Agregar al carro")
        
        
        totalCarro()
        localStorage.setItem("carrito", JSON.stringify(carroCompras));
      }

      Toastify({
        text: "👻 Producto eliminado del carro",
        gravity: "bottom",
        className: "toast",
        style: {
          background: "#ff8585",
        },
      }).showToast();
    };
  }

  localStorage.setItem("carrito", JSON.stringify(carroCompras));
}


//Carro vacío
function vacio() {
  carroCompras.length == 0 && (
    carroVacio.innerText = "No tienes productos en tu carrito ☹️",
    carroVacio.style.display = "block"
  )
}
vacio()



//Total carro
function totalCarro() {
  let total = carroCompras.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0)

  totalCompra.innerHTML = `
    <p class="precioTotal">TOTAL</p> <p class="valorTotal">${numeral(total).format("($00.000)")}</p>`

  carroCompras.length == 0 ? totalCompra.style.display = "none" : totalCompra.style.display = "flex"

  localStorage.setItem("total", total);

  //contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad, 0)  
}


// //Botón comprar
let btnComprar = document.createElement("button")
btnComprar.className = "comprar"
btnComprar.innerHTML = `<a href="#">Proceder al pago <span class="material-icons">
arrow_forward
</span></a>`

detalleCarro.appendChild(btnComprar)
btnComprar.style.display="none"

function comprar (){
  carroCompras.length > 0 ? btnComprar.style.display="block" : btnComprar.style.display="none"
}


//Email descuento
let emailDescuento = document.getElementById("emailDesc"),
  guardarEmail = document.getElementById("guardarEmail");

function comprobarEmail() {
  emailDescuento.value == localStorage.getItem("Email cliente")
    ? (guardarEmail.innerText = "Ya ingresaste este correo 😥")
    : (guardarEmail.innerText = "Tu código es COMPRA10%");
}

guardarEmail.onclick = () => {
  comprobarEmail();
  emailDescuento.style.display = "none";
  localStorage.setItem("Email cliente", emailDescuento.value);
};

