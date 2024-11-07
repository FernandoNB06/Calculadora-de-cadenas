function calcularCadena(cadena) {
  if (!cadena) {
    return 0;
  }
  
  if (cadena.includes(",")) {
    const numeros = cadena.split(",").map(Number);
    return numeros.reduce((suma,num) => suma+num,0);
  }

  if (cadena.includes("-")) {
    const numeros = cadena.split("-").map(Number);
    return numeros.reduce((suma,num) => suma+num,0);
  }

  if (cadena.startsWith("//")) {
    const delimitadorFin = cadena.indexOf("\n");
    const delimitador = cadena.slice(2, delimitadorFin).replace(/[\[\]]/g, "");
    cadena = cadena.slice(delimitadorFin + 1);

    console.log("Delimitador:", delimitador); // Verifica el delimitador
    console.log("Cadena después del delimitador:", cadena); // Verifica la cadena de números

    const numeros = cadena.split(delimitador).map(Number);
    console.log("Números:", numeros); // Verifica los números extraídos

    return numeros.reduce((suma, num) => suma + num, 0);
  }

  return +cadena;
  
  
}
export default calcularCadena;
