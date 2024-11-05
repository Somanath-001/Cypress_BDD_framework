class tabs_fields {
  clickon_signin() {
    cy.contains("a", "Sign In").click();
  }
  email() {
    return cy.get("#account_sign_in_form_email_id");
  }
  password() {
    return cy.get("#account_sign_in_form_passwd_id");
  }
  clickon_signIn() {
    cy.get(".btn.btn-primary.input_submit").click();
  }
  click_signout_btn() {
    cy.contains("a", "Sign Out").click();
  }
  apparel() {
    return cy.contains("a", "Apparel");
  }
  furniture() {
    return cy.contains("a", "Furniture");
  }
  sport() {
    return cy.get(".header-navigation > :nth-child(1) > :nth-child(5) > a");
  }
  digitaldistribution() {
    return cy.contains("a", "Digital Distribution");
  }
}

export default new tabs_fields();
