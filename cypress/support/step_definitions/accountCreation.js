const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
import createAccount from "../../support/page_objects/createAccount";

let data1;
let data2;
let data3;
beforeEach(() => {
  cy.fixture("credentials.json").then((data) => {
    data1 = data[0];
    data2 = data[1];
    data3 = data[2];
  });
});
Given("Navigates to the avactis homescreen", () => {
  cy.visit("http://localhost/avactis/");
});
When("I click on the signin tab", () => {
  createAccount.signin().click();
});
Then("I should redirected to the my account screen", () => {
  cy.get("h1").should("contain.text", "My Account");
});
When("I tap on the Register button", () => {
  createAccount.register().click();
});
Then("I should redirected to the registration form screen", () => {
  cy.url().should("includes", "register.php");
  cy.get("h1").should("contains.text", "Registration Form");
});

When("I types the valid email id", () => {
  createAccount
    .email()
    .clear()
    .type(data3.email + "26@gmail.com");
});
When("I types the valid password", () => {
  createAccount.password().clear().type(data3.password);
});

When("I type the valid password in re-type password field", () => {
  createAccount.rePassword().clear().type(data3.password);
});

When("I type the first name", () => {
  createAccount.firstName().clear().type(data3.firstName);
});

When("I type the last name", () => {
  createAccount.lastName().clear().type(data3.lastName);
});

When("I select the country", () => {
  createAccount.country().select(data3.Country);
});

When("I select the state", () => {
  createAccount.state().select(data3.State);
});

When("I type the zipcode", () => {
  createAccount.zipCode().clear().type(data3.ZipCode);
});
When("I type the city", () => {
  createAccount.city().clear().type(data3.City);
});
When("I type the Address", () => {
  createAccount.addressLine1().clear().type(data3.AddressLine1);
});
When("I type the phone number", () => {
  createAccount.phoneNumber().clear().type(data3.ContactPhone);
});
When("I tap on register button", () => {
  createAccount.register1().click();
});
Then(
  "I should redirected to the my account screen and should see the account creation successfull message",
  () => {
    cy.url().should("includes", "home");
    cy.get(".note.note-success").should(
      "contain.text",
      "Account created successfully. You are now registered."
    );
  }
);

//Scenario: Create the account with existing email
When("I types the existing email id", () => {
  createAccount.email().clear().type(data1.email, { force: true });
});
Then(
  "I should see the This account name is already taken error message",
  () => {
    cy.get(".note.note-danger").should(
      "have.text",
      "This account name is already taken. Please choose a different account name."
    );
  }
);

// Scenario: Create the account without filling required fields
When("I types the valid email id1", () => {
  createAccount
    .email()
    .clear()
    .type(data3.email + "9@gmail.com", { force: true });
});

When("I put the empty for the first name", () => {
  createAccount.firstName().clear({ force: true });
});
When("I put the empty for the last name", () => {
  createAccount.lastName().clear({ force: true });
});
Then("I should see the error message", () => {
  cy.wait(10000);
  cy.get(".note.note-danger").should(
    "have.text",
    "Invalid data in field 'First Name'.Invalid data in field 'Last Name'."
  );
});
