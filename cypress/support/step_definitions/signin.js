const {
  Given,
  Then,
  When,
} = require("@badeball/cypress-cucumber-preprocessor");
import tabs from "../page_objects/tabs";
let data1;
let data2;
// Scenario 1  Signin with valid credentials

Given("Navigated to the avactis homescreen", () => {
  cy.visit("http://localhost/avactis/");
});

When("I click on signin tab", () => {
  cy.fixture("credentials.json").then((data) => {
    data1 = data[0];
    data2 = data[1];
  });
  tabs.clickon_signin();
});
Then("I should navigated to the my account screen", () => {
  cy.get("h1").should("contain.text", "My Account");
});
When("I type the valid email id", () => {
  tabs.email().type(data1.email);
});
When("I type the valid password", () => {
  tabs.password().type(data1.password);
});
When("I click on signin button", () => {
  tabs.clickon_signIn();
});
Then("I should be directed to the My Account screen", () => {
  cy.url().should("includes", "home");
  cy.get("h1").should("contain.text", "My Account");
});

// Scenario 2 Signin with invalid email id

When("I type the invalid email id", () => {
  tabs.email().clear();
  tabs.email().type(data2.email);
});
Then("I should see the account and password could not findout  error", () => {
  checkerror();
});

//Scenario 3: Signin with invalid password
When("I type the invalid password", () => {
  tabs.password().clear();
  tabs.password().type(data2.password);
});
function checkerror() {
  cy.get(".note.note-danger").should(
    "have.text",
    "Account and password could not be identified. Try again or create an account."
  );
}

//Validate to the sucessfull and unsucessfull signin
When("I type the email {string} and password {string}", (email, password) => {
  tabs.email().type(email);
  tabs.password().type(password);
});
Then("I should see the {string}", (message) => {
  // login sucessfull message
  if (message === "My Account") {
    cy.url().should("includes", "home");
    cy.get("h1").should("contain.text", message);
    // unsucessfull message
  } else {
    cy.get(".note.note-danger").should("have.text", message);
  }
});
