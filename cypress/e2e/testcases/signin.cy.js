import tabs from "../support/tabs";
describe("Signin and signout tests in avactis", () => {
  let data1;
  let data2;
  beforeEach(() => {
    cy.fixture("credentials.json").then((data) => {
      data1 = data[0];
      data2 = data[1];
    });

    cy.visit("http://localhost/avactis/");
  });
  it("Login to Avactis with Valid credentials", () => {
    tabs.signin().click();
    tabs.email().type(data1.email);
    tabs.password().type(data1.password);
    tabs.signIn().click();
    cy.url().should("includes", "home");
    cy.get("h1").should("contain.text", "My Account");
  });

  it("login with Invalid email id", () => {
    tabs.signin().click();
    tabs.email().type(data2.email);
    tabs.password().type(data1.password);
    tabs.signIn().click();
    cy.get(".note.note-danger").should(
      "have.text",
      "Account and password could not be identified. Try again or create an account."
    );
  });
  it("Login with Invalid password", () => {
    tabs.signin().click();
    tabs.email().type(data1.email);
    tabs.password().type(data2.password);
    tabs.signIn().click();
    cy.get(".note.note-danger").should(
      "have.text",
      "Account and password could not be identified. Try again or create an account."
    );
  });
  it.only("signout from Avactis application", () => {
    tabs.signin().click();
    tabs.email().type(data1.email);
    tabs.password().type(data1.password);
    tabs.signIn().click();
    cy.url().should("includes", "home");
    tabs.signout().click();
    cy.url().should("includes", "sign-in");
    cy.get("h1").should("contain.text", "My Account");
    cy.get("h2").should("contain.text", "Sign in or create a new account");
  });
});
