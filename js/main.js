const inventario = [
  { nombre: "Polerón", precio: 20000, stock: 10 },
  { nombre: "Pantalón", precio: 25000, stock: 15 },
  { nombre: "Beanie", precio: 10000, stock: 8 },
  { nombre: "Banano", precio: 15000, stock: 10 },
];

let productos = parseInt(
  prompt(
    "Selecciona un producto \n1. Polerón \n2. Pantalón \n3. Beanie \n4. Banano",
    "Ingresa una opción del 1 al 4"
  )
);

let precio = 0;
let nombre = 0;
let stock = 0;

switch (productos) {
  case 1:
    nombre = inventario[0].nombre;
    precio = inventario[0].precio;
    stock = inventario[0].stock;
    break;

  case 2:
    nombre = inventario[1].nombre;
    precio = inventario[1].precio;
    stock = inventario[1].stock;
    break;

  case 3:
    nombre = inventario[2].nombre;
    precio = inventario[2].precio;
    stock = inventario[2].stock;
    break;

  case 4:
    nombre = inventario[3].nombre;
    precio = inventario[3].precio;
    stock = inventario[3].stock;
    break;

  default:
    precio = 0;
    break;
}

let cantidad = parseInt(
  prompt(
    "Ingresa la cantidad de " + nombre + " que deseas" +
      "\nHay " + stock + " disponibles"
  )
);

//Función para realizar pago
function checkout() {
  let carrito = [nombre, precio, cantidad],
    total = parseInt(carrito[1] * carrito[2]);

  let pago = prompt(
    "Has seleccionado " + carrito[2] + " x " + carrito[0] + " a " + carrito[1] + " c/u" +
    "\nIngresa tu pago de $" + total
  );

  carrito.push(pago);

  //Si el pago no está completo
  while (pago < total) {
    alert("Monto pagado: $" + pago + ", te faltan: $" + (total - pago) + " 😥");

    pago = prompt(
      "Has seleccionado " + carrito[2] + " x " + carrito[0] + " a " + carrito[1] + " c/u" +
      "\nIngresa tu pago de $" + total
    );
  }
  carrito.pop();
  carrito.push(pago);

  let vuelto = parseInt(carrito[3] - total);

  //Pago completo
  if (pago == total) {
    alert(
      "Comppraste " + carrito[2] + " x " + carrito[0] + ", a $" + carrito[1] + " c/u " +
        "\n¡Muchas gracias por tu compra! 🙌"
    );
  } else if (pago > total) {
    alert(
      "Tu vuelto es: $" + vuelto +
      "\nCompraste " + carrito[2] + " x " + carrito[0] + ", a $" + carrito[1] + " c/u " +
        "\n¡Muchas gracias por tu compra! 🙌"
    );
  }
}
//Fin de la función

//Trigger de pago
if (precio == 0) {
  alert("¿Estás vitrineando? Vuelve pronto, te esperamos ✌️");
} else if (precio > 0) {
  checkout();
}
