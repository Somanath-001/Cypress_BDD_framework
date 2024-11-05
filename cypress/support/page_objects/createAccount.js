class tabs_fields {
  signin() {
    return cy.contains("a", "Sign In");
  }
  register() {
    return cy.contains("a", "Register");
  }
  email() {
    return cy.get('input[name="customer_info[Customer][Email]"]');
  }
  password() {
    return cy.get('input[name="customer_info[Customer][Password]"]');
  }
  rePassword() {
    return cy.get('input[name="customer_info[Customer][RePassword]"]');
  }
  firstName() {
    return cy.get('input[name="customer_info[Customer][FirstName]"]');
  }
  lastName() {
    return cy.get('input[name="customer_info[Customer][LastName]"]');
  }
  country() {
    return cy.get("#customer_info_Customer_Country");
  }
  state() {
    return cy.get("#customer_info_Customer_State");
  }
  zipCode() {
    return cy.get('input[name="customer_info[Customer][ZipCode]"]');
  }
  city() {
    return cy.get('input[name="customer_info[Customer][City]"]');
  }
  addressLine1() {
    return cy.get('input[name="customer_info[Customer][Streetline1]"]');
  }
  addressLine2() {
    return cy.get('input[name="customer_info[Customer][Streetline2]"]');
  }
  phoneNumber() {
    return cy.get('input[name="customer_info[Customer][Phone]"]');
  }
  register1() {
    return cy.get('input[value="Register"]');
  }
}

export default new tabs_fields();
