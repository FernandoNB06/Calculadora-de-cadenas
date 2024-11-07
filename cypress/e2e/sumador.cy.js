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
});
