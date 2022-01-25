let precio = 0
let productos = parseInt(
  prompt(
    "Selecciona un producto \n1. Polerón \n2. Pantalón \n3. Beanie \n4. Banano", "Ingresa una opción del 1 al 4"
  )
);

switch (productos) {
  case 1:
    precio = 20000;
    break;

  case 2:
    precio = 25000;
    break;

  case 3:
    precio = 10000;
    break;

  case 4:
    precio = 15000;
    break;

  default:
    precio = 0;
    break;
}

function checkout(){
  let pago = prompt("Ingresa tu pago de $" + precio);

  while (pago < precio) {
    alert(
      "Monto pagado: $" + pago + ", te faltan: $" + (precio - pago) + " 😥"
    );
    pago = prompt("Ingresa tu pago de $" + precio);
  }

  if (pago == precio) {
    alert("¡Muchas gracias por tu compra! 🙌");
  } else if (pago > precio) {
    alert(
      "Tu vuelto es: $" +
        (pago - precio) +
        ", ¡muchas gracias por tu compra! 🙌"
    );
  }
}

if (precio == 0) {
  alert("¿Estás vitrineando? Vuelve pronto, te esperamos ✌️");

} else if (precio > 0) {
 checkout();
}
