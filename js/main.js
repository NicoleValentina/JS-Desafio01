let precio = 0
let nombre = 0
let productos = parseInt(
  prompt(
    "Selecciona un producto \n1. Polerón \n2. Pantalón \n3. Beanie \n4. Banano", "Ingresa una opción del 1 al 4"
  )
);

switch (productos) {
  case 1:
    nombre = "Polerón"
    precio = 20000;
    break;

  case 2:
    nombre = "Pantalón"
    precio = 25000;
    break;

  case 3:
    nombre = "Beanie"
    precio = 10000;
    break;

  case 4:
    nombre = "Banano"
    precio = 15000;
    break;

  default:
    precio = 0;
    break;
}

let cantidad = parseInt(prompt("Ingresa la cantidad de " + nombre + " que deseas"))

function checkout(){

  let carrito = [nombre, precio, cantidad], total = parseInt(carrito[1]*carrito[2]);

  let pago = prompt("Has seleccionado " + carrito[2] + " x " + carrito[0] + " a " + carrito[1] + " c/u" + "\nIngresa tu pago de $" + total);

  carrito.push(pago)
  
  let saldo = parseInt(total - carrito[3])

  while (pago < total) {
    alert(
      "Monto pagado: $" + carrito[3] + ", te faltan: $" + saldo  + " 😥"
    );
    pago = prompt("Has seleccionado " + carrito[2] + " x " + carrito[0] + " a " + carrito[1] + " c/u" + "\nIngresa tu pago de $" + total);
  }
  carrito.pop()
  carrito.push(pago)

  let vuelto = parseInt(carrito[3] - total)

  if (pago == total) {
    alert("Comppraste " + carrito[2] + " x " + carrito[0] + ", a $" + carrito[1] + " c/u " + "\n¡Muchas gracias por tu compra! 🙌");
  } 
  else if (pago > total) {
    alert(
      "Tu vuelto es: $" + vuelto +
        ", ¡muchas gracias por tu compra! 🙌"
    );
  }
}


if (precio == 0) {
  alert("¿Estás vitrineando? Vuelve pronto, te esperamos ✌️");

} else if (precio > 0) {
 checkout();
}
