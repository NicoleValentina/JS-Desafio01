let pago = prompt("Ingresa tu pago de $25.000")

while (pago < 25000) {
    alert("Monto pagado: $" + pago + ", te faltan: $" + (25000 - pago) + " 😥")
    pago = prompt("Ingresa tu pago de $25.000")
}

if(pago == 25000){
    alert("¡Muchas gracias por tu compra! 🙌")
} else if (pago > 25000){
    alert ("Tu vuelto es: $" + (pago - 25000) + ", ¡muchas gracias por tu compra! 🙌")
}