function esCadenaVacia(cadena) {
  return !cadena || cadena.trim() === ""; // Verifica cadenas vacías o solo espacios
}

function sumarDesdeCadena(cadena) {
  if (esCadenaVacia(cadena)) return 0; // Si la cadena está vacía, devolver 0

  const delimitadorRegex = crearRegexParaDelimitadores(cadena);

  const numerosCadena = cadena.startsWith("//")
    ? cadena.slice(cadena.indexOf("\n") + 1)
    : cadena;

  return sumarNumerosDesdeCadena(numerosCadena, delimitadorRegex);
}

function crearRegexParaDelimitadores(cadena) {
  const delimitadoresPorDefecto = [",", "-"];

  if (cadena.startsWith("//")) {
    const delimitadorFin = cadena.indexOf("\n");
    const delimitadorParte = cadena.slice(2, delimitadorFin);

    const delimitadores = delimitadorParte.startsWith("[")
      ? (delimitadorParte.match(/\[([^\]]+)\]/g) || []).map(d => d.slice(1, -1))
      : [delimitadorParte];

    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(delimitadores.map(escapeRegExp).join("|"), "g");
  }

  return new RegExp(delimitadoresPorDefecto.map(d => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "g");
}

function sumarNumerosDesdeCadena(cadena, delimitadorRegex) {
  const numeros = cadena.split(delimitadorRegex).map(Number);
  verificarNumerosNegativos(numeros); // Validar números negativos
  return numeros
    .filter(num => num <= 1000) // Ignorar números mayores a 1000
    .reduce((suma, num) => suma + num, 0);
}

function verificarNumerosNegativos(numeros) {
  const negativos = numeros.filter(num => num < 0);
  if (negativos.length > 0) {
    throw new Error(`Números negativos no permitidos: ${negativos.join(", ")}`);
  }
}

export default sumarDesdeCadena;
