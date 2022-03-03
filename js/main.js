let carroCompras = [];

let contenedor = document.getElementById("contenedor")

//Llamar productos
async function productos() {
  const respuesta = await fetch("./js/productos.json")
  const productos = await respuesta.json()

  productos.forEach((prod) => {
    let { imagen, nombre, precio, stock, id } = prod
    let contenedorProd = document.createElement("div")
    contenedorProd.className = "colProd"
    contenedorProd.innerHTML += `
           <img class="producto" src=${imagen}>
           <h3>${nombre}</h3>   
           <h4>${numeral(precio).format("($00.000)")}</h4>
           <p>Hay ${stock} en stock</p>
           <button class="agregarCarro" id="agregar${id}">Agregar al carro</button>`

    contenedor.appendChild(contenedorProd);

    let agregarProd = document.getElementById(`agregar${id}`)

    agregarProd.onclick = () => {
      agregarCarro(id)

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

productos()

//Abrir y cerrar carro
let iconoCarro = document.getElementById("carrito"),
  detalleCarro = document.createElement("div")

document.body.append(detalleCarro);
detalleCarro.className = "detalleCarro"
detalleCarro.innerHTML = ` 
    <div class="headerCarro">
    <h3>Carro de compras</h3>
    <span class="material-icons cerrar" id="cerrarCarro">
    close
    </span></div>
    <div id="prodCarro"></div>
`

iconoCarro.onclick = () => {
  detalleCarro.style.right = "0"
}

let cerrarCarro = document.getElementById("cerrarCarro")

cerrarCarro.onclick = () => {
  detalleCarro.style.right = "-31vw"
}

let contProdCarro = document.getElementById("prodCarro");


//Agregar prod al carro
async function agregarCarro(id) {
  const respuesta = await fetch("./js/productos.json")
  const productos = await respuesta.json()

  let prodRepetido = carroCompras.find((buscar) => buscar.id == id)

  if (prodRepetido) {
    prodRepetido.cantidad = parseInt(prodRepetido.cantidad) + 1

    document.getElementById(`cantProd${prodRepetido.id}`).value = parseInt(prodRepetido.cantidad)

    document.getElementById(`precio${prodRepetido.id}`).innerHTML = 
        `<p id="precio${prodRepetido.id}">${numeral(prodRepetido.precio * prodRepetido.cantidad).format("($00.000)")}</p> `
    
  } else {

    let agregarProd = productos.find((elemento) => elemento.id == id);
    carroCompras.push(agregarProd)

    let filaProdCarro = document.createElement("div")
    filaProdCarro.className = "itemCarro"
    filaProdCarro.innerHTML = `
            <img class="imgProdCarro" src="${agregarProd.imagen}" alt=${
            agregarProd.nombre}>
            <p>${agregarProd.nombre}</p>
            <div id="cantidad">
                <input type="button" name="sumaresta" id="restar${agregarProd.id}" value="–">
                <input type="number" name="cantidad" value="1" id="cantProd${agregarProd.id}">
                <input type="button" name="sumaresta" id="sumar${agregarProd.id
                }" value="+">
              </div>
              <p id="precio${agregarProd.id}">${numeral(
              agregarProd.precio * agregarProd.cantidad).format("($00.000)")}</p> 
              <span class="material-icons cerrar" id="btnEleminar${agregarProd.id}">
              close
              </span>`

    contProdCarro.appendChild(filaProdCarro)

    //Sumar y restar en Carrito
    let agregarCant = document.getElementById(`sumar${agregarProd.id}`),
      restarCant = document.getElementById(`restar${agregarProd.id}`),
      inputCantidad = document.getElementById(`cantProd${agregarProd.id}`)

    agregarCant.onclick = () => {
      let agregarProd = productos.find((elemento) => elemento.id == id)
      carroCompras.push(agregarProd)

      let cantidad = inputCantidad.value
      let sumarCant = parseInt(cantidad) + 1

      inputCantidad.value = sumarCant

      document.getElementById(`precio${agregarProd.id}`).innerHTML = 
          `<p id="precio${agregarProd.id}">${numeral(agregarProd.precio * inputCantidad.value).format("($00.000)")}</p> `
    }

    restarCant.onclick = () => {
      carroCompras = carroCompras.filter((item) => item.id != agregarProd.id)

      let cantidad = inputCantidad.value
      let restarCant = parseInt(cantidad) - 1

      inputCantidad.value = restarCant

      document.getElementById(`precio${agregarProd.id}`).innerHTML =
           `<p id="precio${agregarProd.id}">${numeral(agregarProd.precio * inputCantidad.value).format("($00.000)")}</p> `

      if (inputCantidad.value == 0) {
        eliminarProd.parentElement.remove()
        
        Toastify({
          text: "👻 Producto eliminado del carro",
          gravity: "bottom",
          className: "toast",
          style: {
            background: "#ff8585",
          },
        }).showToast();
      }
    }


    //Eliminar Productos
    let eliminarProd = document.getElementById(`btnEleminar${agregarProd.id}`)

    eliminarProd.onclick = () => {
      eliminarProd.parentElement.remove()
      carroCompras = carroCompras.filter((item) => item.id != agregarProd.id);

      Toastify({
        text: "👻 Producto eliminado del carro",
        gravity: "bottom",
        className: "toast",
        style: {
          background: "#ff8585",
        },
      }).showToast()
      }
  }
  localStorage.setItem("carrito", JSON.stringify(carroCompras))
}

//Email descuento
let emailDescuento = document.getElementById("emailDesc"),
  guardarEmail = document.getElementById("guardarEmail")

function comprobarEmail() {
  emailDescuento.value == localStorage.getItem("Email cliente")
    ? (guardarEmail.innerText = "Ya ingresaste este correo 😥")
    : (guardarEmail.innerText = "Tu código es COMPRA10%")
}

guardarEmail.onclick = () => {
  comprobarEmail();
  emailDescuento.style.display = "none"
  localStorage.setItem("Email cliente", emailDescuento.value)
}