describe("Sumador", () => {
  it("Deberia devolver 0 si la cadena esta vacia", () => {
    cy.visit("/");
    cy.get("#cadena").clear();
    cy.get("#sumar-button").click();
    cy.get("#resultado-div").should("contain","0");
  });

  it("Deberia devolver 1 solo un numero", () => {
    cy.visit("/");
    cy.get("#cadena").type("1");
    cy.get("#sumar-button").click();
    cy.get("#resultado-div").should("contain","1");
  });

  it("Si los números están separados por una coma, deben sumarse", () => {
    cy.visit("/");
    cy.get("#cadena").type("1,2,3");
    cy.get("#sumar-button").click();
    cy.get("#resultado-div").should("contain","6");
  });
  it("Si los números están separados por una guion, deben sumarse", () => {
    cy.visit("/");
    cy.get("#cadena").type("1-2-3");
    cy.get("#sumar-button").click();
    cy.get("#resultado-div").should("contain","6");
  });
  it("Debe manejar delimitadores personalizados", () => {
    cy.visit("/");
    cy.get("#cadena").type("//[;]\\n6;7;4"); // Nota: \\n para el salto de línea
    cy.get("#sumar-button").click();
    cy.get("#resultado-div").should("contain", "17");
  });
  it("Debe ignorar números mayores a 1000", () => {
    cy.visit("/");
    cy.get("#cadena").type("2,1001");
    cy.get("#sumar-button").click();
    cy.get("#resultado-div").should("contain", "2"); // 1001 debe ser ignorado

    cy.get("#cadena").clear().type("1000,1001,5");
    cy.get("#sumar-button").click();
    cy.get("#resultado-div").should("contain", "1005"); // 1000 se incluye, 1001 se ignora
  });
  it("Debe manejar delimitadores personalizados con más de un carácter", () => {
    cy.visit("/");
    cy.get("#cadena").type("//[***]\\n1***2***3"); // Nota: \\n para el salto de línea
    cy.get("#sumar-button").click();
    cy.get("#resultado-div").should("contain", "6"); // 1 + 2 + 3 = 6
  });
  it("Debe manejar múltiples delimitadores", () => {
    cy.visit("/");
    cy.get("#cadena").type("//[*][%]\\n1*2%3"); // Nota: \\n para el salto de línea
    cy.get("#sumar-button").click();
    cy.get("#resultado-div").should("contain", "6"); // 1 + 2 + 3 = 6
  });
});
