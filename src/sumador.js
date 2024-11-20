function esCadenaVacia(cadena) {
  return !cadena || cadena.trim() === ""; // Verifica cadenas vacías o solo espacios
}

function calcular(cadena) {
  if (esCadenaVacia(cadena)) return 0;

  const { delimitador, cadenaNumeros } = extraerDelimitadorYCadena(cadena);

  const numeros = cadenaNumeros.split(delimitador).map(Number);

  const numerosValidos = excluirNumerosMayoresA1000(numeros);

  return numerosValidos.reduce((acc, num) => acc + num, 0);
}

function extraerDelimitadorYCadena(cadena) {
  const delimitadorPorDefecto = /,|-/;

  // Caso sin delimitador personalizado
  const delimitadorPersonalizado = cadena.match(/^\/\/(\[.+?\])+\s/);
  if (!delimitadorPersonalizado) {
    return { delimitador: delimitadorPorDefecto, cadenaNumeros: cadena };
  }

  // Extraer delimitadores entre corchetes
  const delimitadores = [...cadena.matchAll(/\[(.+?)\]/g)].map(match => match[1]);

  const delimitadorRegex = crearRegexDelimitadores(delimitadores);

  const cadenaNumeros = cadena.slice(delimitadorPersonalizado[0].length);

  return { delimitador: delimitadorRegex, cadenaNumeros };
}

function crearRegexDelimitadores(delimitadores) {
  const delimitadoresEscapados = delimitadores.map(escaparDelimitador);
  return new RegExp(delimitadoresEscapados.join("|"));
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
