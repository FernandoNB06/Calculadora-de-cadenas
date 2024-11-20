function extraerDelimitadorYNumeros(cadenaEntrada) {
  const delimitadoresDefault = /,|-/;

  const delimitadorPersonalizado = cadenaEntrada.match(/^\/\/(\[.+?\])+\s/);
  if (!delimitadorPersonalizado) {
    return { delimitador: delimitadoresDefault, cadenaNumeros: cadenaEntrada };
  }

  const delimitadores = [...cadenaEntrada.matchAll(/\[(.+?)\]/g)].map(match => match[1]);
  const delimitadoresEscapados = delimitadores.map(delim => delim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  const delimitador = new RegExp(`${delimitadoresEscapados.join('|')}|,|-`);
  const cadenaNumeros = cadenaEntrada.slice(delimitadorPersonalizado[0].length);

  return { delimitador: expresionDelimitadores, numerosComoTexto };
}

function esCadenaEntradaVacia(cadenaEntrada) {
  return cadenaEntrada.trim() === "";
}

function filtrarNumerosValidos(numeros) {
  return numeros.filter(num => num <= 1000);
}

function sumarNumerosDeCadena(cadenaEntrada) {
  if (esCadenaEntradaVacia(cadenaEntrada)) {
    return 0;
  }

  const { delimitador: expresionDelimitadores, numerosComoTexto } = extraerDelimitadorYNumeros(cadenaEntrada);

  const numerosParseados = numerosComoTexto
    .split(expresionDelimitadores)
    .map(Number);

  const numerosValidos = filtrarNumerosValidos(numerosParseados);

  return numerosValidos.reduce((acc, num) => acc + num, 0);
}

export default sumarNumerosDeCadena;
