function esCadenaVacia(cadena) {
  return !cadena || cadena.trim() === ""; // Verifica cadenas vacías o solo espacios
}

function sumarDesdeCadena(cadena) {
  if (esCadenaVacia(cadena)) return 0;

  const { delimitador, cadenaNumeros } = extraerDelimitadorYCadena(cadena);

  return sumarNumerosDesdeCadena(cadenaNumeros, delimitador);
}

function extraerDelimitadorYCadena(cadena) {
  const delimitadorPorDefecto = /,|-/;

  if (!cadena.startsWith("//")) {
    return { delimitador: delimitadorPorDefecto, cadenaNumeros: cadena };
  }

  const delimitadorFin = cadena.indexOf("\n");
  const delimitadorParte = cadena.slice(2, delimitadorFin);

  const delimitadores = delimitadorParte.startsWith("[")
    ? (delimitadorParte.match(/\[(.+?)\]/g) || []).map(match => match.slice(1, -1))
    : [delimitadorParte];

  const delimitadoresEscapados = delimitadores.map(delim =>
    delim.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );

  const delimitadorRegex = new RegExp(delimitadoresEscapados.join("|"));

  return {
    delimitador: delimitadorRegex,
    cadenaNumeros: cadena.slice(delimitadorFin + 1),
  };
}

function sumarNumerosDesdeCadena(cadena, delimitadorRegex) {
  const numeros = cadena.split(delimitadorRegex).map(Number);
  verificarNumerosNegativos(numeros); // Validar números negativos

  const numerosValidos = excluirNumerosMayoresA1000(numeros);

  return numerosValidos.reduce((suma, num) => suma + num, 0);
}

function excluirNumerosMayoresA1000(numeros) {
  return numeros.filter(num => num <= 1000);
}

function verificarNumerosNegativos(numeros) {
  const negativos = numeros.filter(num => num < 0);
  if (negativos.length > 0) {
    throw new Error(`Números negativos no permitidos: ${negativos.join(", ")}`);
  }
}

export default sumarDesdeCadena;
