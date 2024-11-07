function calcularCadena(cadena) {
  if (!cadena) {
    return 0; // Si la cadena está vacía, devuelve 0
  }

  if (cadena.includes(",")) {
    const numeros = cadena.split(",").map(Number);
    let suma = 0;
    for (const num of numeros) {
      if (num <= 1000) { // Ignora los números mayores a 1000
        suma += num;
      }
    }
    return suma;
  }

  if (cadena.includes("-")) {
    const numeros = cadena.split("-").map(Number);
    let suma = 0;
    for (const num of numeros) {
      if (num <= 1000) { // Ignora los números mayores a 1000
        suma += num;
      }
    }
    return suma;
  }

  // Manejar delimitador personalizado, incluyendo múltiples caracteres
  if (cadena.startsWith("//")) {
    const delimitadorFin = cadena.indexOf("\n");
    const delimitadorParte = cadena.slice(2, delimitadorFin);

    // Extraer todos los delimitadores personalizados dentro de corchetes
    const delimitadores = delimitadorParte.match(/\[([^\]]+)\]/g).map(d => d.slice(1, -1));

    // Obtén la parte de la cadena después del \n
    cadena = cadena.slice(delimitadorFin + 1);

    // Crear una expresión regular que separe por todos los delimitadores
    const delimitadorRegex = new RegExp(delimitadores.map(d => escapeRegExp(d)).join("|"), "g");

    // Dividir la cadena con los delimitadores y sumar los números
    const numeros = cadena.split(delimitadorRegex).map(Number);
    let suma = 0;
    for (const num of numeros) {
      if (num <= 1000) { // Ignora los números mayores a 1000
        suma += num;
      }
    }
    return suma;
  }

  // Si es un solo número, verifica que sea menor o igual a 1000
  return +cadena <= 1000 ? +cadena : 0;
}

// Función para escapar caracteres especiales en una expresión regular
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default calcularCadena;
