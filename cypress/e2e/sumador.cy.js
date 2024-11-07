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
});
