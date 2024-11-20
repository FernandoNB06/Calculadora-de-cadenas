function calcularCadena(cadena) {
  if (!cadena) return 0; // Si la cadena está vacía, devolver 0

  const delimitadorRegex = generarRegexDelimitadores(cadena);

  // Si comienza con delimitadores personalizados, separa la parte de números
  const numerosCadena = cadena.startsWith("//")
    ? cadena.slice(cadena.indexOf("\n") + 1)
    : cadena;

  return dividirYSumar(numerosCadena, delimitadorRegex);
}

function generarRegexDelimitadores(cadena) {
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

function dividirYSumar(cadena, delimitadorRegex) {
  const numeros = cadena.split(delimitadorRegex).map(Number);
  validarNumeros(numeros); // Validar números negativos
  return numeros
    .filter(num => num <= 1000) // Ignorar números mayores a 1000
    .reduce((suma, num) => suma + num, 0);
}

function validarNumeros(numeros) {
  const negativos = numeros.filter(num => num < 0);
  if (negativos.length > 0) {
    throw new Error(`Números negativos no permitidos: ${negativos.join(", ")}`);
  }
}

export default calcularCadena;
