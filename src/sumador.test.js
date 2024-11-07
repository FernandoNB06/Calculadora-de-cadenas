import calcularCadena from "./sumador.js";

describe("Sumar", () => {
  it("deberia devolver 0 si la cadena esta vacia", () => {
    expect(calcularCadena("")).toEqual(0);
  });
});
