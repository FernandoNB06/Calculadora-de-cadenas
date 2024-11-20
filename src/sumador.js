class CalculadoraDeCadenas {
  constructor() {
    this.delimitadoresPorDefecto = [",", "-"];
  }

  calcular(cadena) {
    if (!cadena) return 0;

    this.validarCadena(cadena);

    const delimitadorRegex = this.generarExpresionDelimitadores(cadena);
    const numeros = cadena.split(delimitadorRegex).map(Number);

    return this.sumarNumeros(numeros);
  }

  generarExpresionDelimitadores(cadena) {
    if (cadena.startsWith("//")) {
      const delimitadorFin = cadena.indexOf("\n");
      const delimitadorParte = cadena.slice(2, delimitadorFin);

      // Extraer delimitadores personalizados entre corchetes
      const delimitadores = (delimitadorParte.match(/\[([^\]]+)\]/g) || []).map(d => d.slice(1, -1));
      return new RegExp(
        delimitadores.map(this.escapeRegExp).join("|"),
        "g"
      );
    }

    // Usar delimitadores por defecto si no hay personalizados
    return new RegExp(this.delimitadoresPorDefecto.map(this.escapeRegExp).join("|"), "g");
  }

  validarCadena(cadena) {
    const numeros = cadena.split(/[^0-9-]/).filter(Boolean);
    if (numeros.some(num => isNaN(num))) {
      throw new Error("La cadena contiene caracteres inválidos.");
    }
  }

  sumarNumeros(numeros) {
    this.validarNumeros(numeros);
    return numeros
      .filter(num => num <= 1000) // Ignorar números > 1000
      .reduce((suma, num) => suma + num, 0);
  }

  validarNumeros(numeros) {
    const negativos = numeros.filter(num => num < 0);
    if (negativos.length > 0) {
      throw new Error(`Números negativos no permitidos: ${negativos.join(", ")}`);
    }
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
}

export default CalculadoraDeCadenas;
