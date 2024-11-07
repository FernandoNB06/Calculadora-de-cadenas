import calcularCadena from "./sumador.js";

describe("Sumar", () => {
  it("deberia devolver 0 si la cadena esta vacia", () => {
    expect(calcularCadena("")).toEqual(0);
  });
  it("deberia devolver 1 solo numero", () => {
    expect(calcularCadena("1")).toEqual(1);
  });

});
