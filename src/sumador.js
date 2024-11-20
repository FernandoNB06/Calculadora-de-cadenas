function calcular(cadenaEntrada) {
  if (esCadenaVacia(cadenaEntrada)) {
    return 0;
  }

  const { delimitador, cadenaNumeros } = extraerDelimitadorYCadena(cadenaEntrada);

  const numeros = cadenaNumeros.split(delimitador).map(Number);

  verificarNumerosNegativos(numeros);

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

function esCadenaVacia(cadenaEntrada) {
  return cadenaEntrada.trim() === "";
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

function escaparDelimitador(delimitador) {
  return delimitador.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default calcular;
