import calcularCadena from "./sumador.js";

describe("Sumar", () => {
  it("deberia devolver 0 si la cadena esta vacia", () => {
    expect(calcularCadena("")).toEqual(0);
  });
  it("deberia devolver 1 solo numero", () => {
    expect(calcularCadena("1")).toEqual(1);
  });
  it("Si los números están separados por una coma, deben sumarse", () => {
    expect(calcularCadena("1,2,3")).toEqual(6);
  });
  it("Si los números están separados por una guion, deben sumarse", () => {
    expect(calcularCadena("1-2-3")).toEqual(6);
  });
  it("Debe manejar delimitadores personalizados", () => {
    expect(calcularCadena("//[;]\n6;7;4")).toEqual(17); 
  })
  it("deberia ignorar numeros mayores a 1000", () => {
    expect(calcularCadena("2,1001")).toEqual(2); // 1001 se ignora
    expect(calcularCadena("1000,1001,5")).toEqual(1005); // 1000 se incluye, pero 1001 se ignora
  });
  it("Debe manejar delimitadores personalizados con más de un carácter", () => {
    expect(calcularCadena("//[***]\n1***2***3")).toEqual(6); // 1 + 2 + 3 = 6
  });
  it("Debe manejar múltiples delimitadores", () => {
    expect(calcularCadena("//[*][%]\n1*2%3")).toEqual(6); // 1 + 2 + 3 = 6
  });

});
