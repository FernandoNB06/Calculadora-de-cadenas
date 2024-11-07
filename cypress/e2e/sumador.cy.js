describe("Sumador", () => {
  it("Deberia devolver 0 si la cadena esta vacia", () => {
    cy.visit("/");
    cy.get("#cadena").clear();
    cy.get("#sumar-button").click();
    cy.get("#resultado-div").should("contain","0");
  });
});
