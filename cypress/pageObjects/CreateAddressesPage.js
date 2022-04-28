import BasePage from "../pageObjects/basePage";

class CreateAddressesPage extends BasePage {
  static get url() {
    return "/#/address/create";
  }

  static get countryInput() {
    return cy.get("input[data-placeholder='Please provide a country.']");
  }
  static get nameField() {
    return cy.get("input[data-placeholder='Please provide a name.']");
  }
  static get numberField() {
    return cy.get("input[data-placeholder='Please provide a mobile number.']");
  }
  static get zipField() {
    return cy.get("input[data-placeholder='Please provide a ZIP code.']");
  }

  static get addressField() {
    return cy.get("#address");
  }
  static get cityField() {
    return cy.get("input[data-placeholder='Please provide a city.']");
  }
  static get stateField() {
    return cy.get("input[data-placeholder='Please provide a state.']");
  }

}

export default CreateAddressesPage;
