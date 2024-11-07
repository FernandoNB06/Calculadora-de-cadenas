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

});
