const delimitadoresPorDefecto = [",", "-"];

function calcularCadena(cadena) {
  if (!cadena) return 0;

  const delimitadores = obtenerDelimitadores(cadena);
  const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const delimitadorRegex = new RegExp(delimitadores.map(escapeRegExp).join("|"), "g");

  const numeros = cadena.split(delimitadorRegex).map(Number);
  return sumarNumeros(numeros);
}

function obtenerDelimitadores(cadena) {
  if (cadena.startsWith("//")) {
    const delimitadorFin = cadena.indexOf("\n");
    const delimitadorParte = cadena.slice(2, delimitadorFin);

    // Extraer delimitadores personalizados
    const delimitadores = (delimitadorParte.match(/\[([^\]]+)\]/g) || []).map(d => d.slice(1, -1));
    return delimitadores;
  }
  return delimitadoresPorDefecto;
}

function validarNumeros(numeros) {
  const negativos = numeros.filter(num => num < 0);
  if (negativos.length > 0) {
    throw new Error(`Números negativos no permitidos: ${negativos.join(", ")}`);
  }
}

function sumarNumeros(numeros) {
  validarNumeros(numeros);
  return numeros
    .filter(num => num <= 1000) // Ignorar números > 1000
    .reduce((suma, num) => suma + num, 0);
}

export default calcularCadena;
