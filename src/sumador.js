function calcularCadena(cadena) {
  if (!cadena) return 0;

  const numero = Number(cadena);
  if (!isNaN(numero) && numero <= 1000) return numero;

  if (cadena.includes(",")) {
    return dividirYSumar(cadena, ",");
  }

  if (cadena.includes("-")) {
    return dividirYSumar(cadena, "-");
  }

  if (cadena.startsWith("//")) {
    return procesarDelimitadoresPersonalizados(cadena);
  }

  return 0; // Caso por defecto
}

function dividirYSumar(cadena, delimitador) {
  const numeros = cadena.split(delimitador).map(Number);
  return sumarNumeros(numeros);
}

function sumarNumeros(numeros) {
  return numeros
    .filter(num => num <= 1000) // Ignorar números > 1000
    .reduce((suma, num) => suma + num, 0);
}

function procesarDelimitadoresPersonalizados(cadena) {
  const delimitadorFin = cadena.indexOf("\n");
  const delimitadorParte = cadena.slice(2, delimitadorFin);

  // Extraer delimitadores entre corchetes
  const delimitadores = (delimitadorParte.match(/\[([^\]]+)\]/g) || []).map(d => d.slice(1, -1));

  // Crear expresión regular para los delimitadores
  const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const delimitadorRegex = new RegExp(delimitadores.map(d => escapeRegExp(d)).join("|"), "g");

  // Obtener la parte numérica de la cadena
  const numeros = cadena.slice(delimitadorFin + 1).split(delimitadorRegex).map(Number);

  return sumarNumeros(numeros);
}

export default calcularCadena;
