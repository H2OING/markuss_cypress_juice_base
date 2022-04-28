import BasePage from "./basePage";

class WalletPaymentPage extends BasePage {
  static get url() {
    return "/#/payment/wallet";
  }
  static get walletBalance() {
    return cy.get(".confirmation");
  }

  static choosePaymentMethod(value) {
    this.rows.contains(value).parent().find('mat-radio-button').click();
  }

  static get continueButton() {
    return cy.get(".nextButton");
  }
}

export default WalletPaymentPage;
