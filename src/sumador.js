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

  return { delimitador, cadenaNumeros };
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

  const { delimitador, cadenaNumeros } = extraerDelimitadorYNumeros(cadenaEntrada);

  const numeros = cadenaNumeros
    .split(delimitador)
    .map(Number);

  const numerosValidos = filtrarNumerosValidos(numeros);

  return numerosValidos.reduce((acc, num) => acc + num, 0);
}

export default sumarNumerosDeCadena;
