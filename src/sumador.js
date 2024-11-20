function esCadenaVacia(cadena) {
  return !cadena || cadena.trim() === ""; // Verifica cadenas vacías o solo espacios
}

function calcular(cadena) {
  if (esCadenaVacia(cadena)) return 0;

  const { delimitador, cadenaNumeros } = extraerDelimitadorYCadena(cadena);

  const numeros = cadenaNumeros.split(delimitador).map(Number);

  verificarNumerosNegativos(numeros); // Validar números negativos antes de continuar

  const numerosValidos = excluirNumerosMayoresA1000(numeros);

  return numerosValidos.reduce((acc, num) => acc + num, 0);
}

function extraerDelimitadorYCadena(cadena) {
  const delimitadorPorDefecto = /,|-/;

  const delimitadorPersonalizado = cadena.match(/^\/\/(\[.+?\])+\s/);
  if (!delimitadorPersonalizado) {
    return { delimitador: delimitadorPorDefecto, cadenaNumeros: cadena };
  }

  const delimitadores = [...cadena.matchAll(/\[(.+?)\]/g)].map(match => match[1]);
  const delimitadoresEscapados = delimitadores.map(escaparDelimitador);

  const delimitador = new RegExp(`${delimitadoresEscapados.join("|")}|,|-`);
  const cadenaNumeros = cadena.slice(delimitadorPersonalizado[0].length);

  return { delimitador, cadenaNumeros };
}

function escaparDelimitador(delimitador) {
  return delimitador.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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

export default calcular;
