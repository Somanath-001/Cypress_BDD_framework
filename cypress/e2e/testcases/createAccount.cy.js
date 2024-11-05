import createaccount from "../support/createaccount";
describe("Create Account", () => {
  before;
  let data1;
  let data2;
  let data3;
  beforeEach(() => {
    cy.fixture("credentials.json").then((data) => {
      data1 = data[0];
      data2 = data[1];
      data3 = data[2];
    });

    cy.visit("http://localhost/avactis/");
  });
  it("Create an account on Avactis application", () => {
    createaccount.signin().click();
    createaccount.register().click();
    createaccount.email().type(data3.email + "4@gmail.com");
    createaccount.password().type(data3.password);
    createaccount.rePassword().type(data3.password);
    createaccount.firstName().type(data3.firstName);
    createaccount.lastName().type(data3.lastName);
    createaccount.country().select(data3.Country);
    createaccount.state().select(data3.State);
    createaccount.zipCode().type(data3.ZipCode);
    createaccount.city().type(data3.City);
    createaccount.addressLine1().type(data3.AddressLine1);
    createaccount.phoneNumber().type(data3.ContactPhone);
    createaccount.register1().click();
    cy.url().should("includes", "home");
    cy.get(".note.note-success").should(
      "contain.text",
      "Account created successfully. You are now registered."
    );
  });

  it("Create an account with existing email", () => {
    createaccount.signin().click();
    createaccount.register().click();
    createaccount.email().type(data1.email);
    createaccount.password().type(data3.password);
    createaccount.rePassword().type(data3.password);
    createaccount.firstName().type(data3.firstName);
    createaccount.lastName().type(data3.lastName);
    createaccount.register1().click();
    cy.get(".note.note-danger").should(
      "have.text",
      "This account name is already taken. Please choose a different account name."
    );
  });
  it.only("Create an account without filling required fields", () => {
    createaccount.register().click();
    createaccount.email().type(data3.email + "5@gmail.com");
    createaccount.password().type(data3.password);
    createaccount.rePassword().type(data3.password);
    // Here the firstname and last name is the required fields
    // createaccount.firstName().type(data3.firstName);
    // createaccount.lastName().type(data3.lastName);
    createaccount.register1().click();
    cy.get(".note.note-danger").should(
      "have.text",
      "Invalid data in field 'First Name'.Invalid data in field 'Last Name'."
    );
  });
});
