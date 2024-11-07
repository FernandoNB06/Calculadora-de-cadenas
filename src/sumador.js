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
  
  if (cadena.startsWith("//")) {
    const delimitadorFin = cadena.indexOf("\n");
    const delimitador = cadena.slice(2, delimitadorFin).replace(/[\[\]]/g, "");
    cadena = cadena.slice(delimitadorFin + 1);

    const numeros = cadena.split(delimitador).map(Number);
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

export default calcularCadena;
