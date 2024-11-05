describe("Visiting website", () => {
  it("visiting Avactis Website", () => {
    cy.visit("http://localhost/avactis/");
    cy.contains("a", "Sign In").click();
    cy.contains("a", "My Account").click();
    cy.contains("a", "My cart").click();
    cy.contains("a", "Checkout").click();
  });
});
