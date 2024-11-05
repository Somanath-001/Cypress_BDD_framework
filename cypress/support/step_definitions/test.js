const {
  Given,
  Then,
  When,
  Before,
  After,
} = require("@badeball/cypress-cucumber-preprocessor");

Before({ tags: "@smoke" }, () => {
  cy.log("Before starting test");
  cy.clearLocalStorage();
});
After(() => {
  cy.log("After excution of test");
});
