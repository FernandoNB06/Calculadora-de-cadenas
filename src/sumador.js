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

  return +cadena;
  
  
}
export default calcularCadena;
