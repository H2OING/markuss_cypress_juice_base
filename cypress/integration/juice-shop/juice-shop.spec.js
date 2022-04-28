import HomePage from "../../pageObjects/HomePage";
import RegistrationPage from "../../pageObjects/RegistrationPage";
import LoginPage from "../../pageObjects/LoginPage";
import SavedAddressesPage from "../../pageObjects/SavedAddressesPage";
import CreateAddressesPage from "../../pageObjects/CreateAddressesPage";
import SavedPaymentsMethods from "../../pageObjects/SavedPaymentsMethods";
import WalletPage from "../../pageObjects/WalletPage";
import WalletpaymentPage from "../../pageObjects/WalletPaymentPage";
import WalletPaymentPage from "../../pageObjects/WalletPaymentPage";

describe("Juice-shop", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.dismissButton.click();
    HomePage.meWantItButton.click();
  });

  it("Registration", () => {
   // TODO: Implement me
   HomePage.accountButton.click();
   HomePage.loginButton.click();
   LoginPage.assertIsCurrentPage();
   LoginPage.notYetCustomer.click();
   RegistrationPage.assertIsCurrentPage();
   let email = "randomEmail" + Math.floor(Math.random() * 1000)+"@gamil.com";
   RegistrationPage.emailInput.type(email);
   RegistrationPage.passwordInput.type('RanDomEd12234')
   RegistrationPage.passwordRepeatInput.type('RanDomEd12234');
   RegistrationPage.securityQuestionField.click();
   RegistrationPage.securityQuestionFieldItems.contains("Mother's maiden name?").click();

   RegistrationPage.securityAnswerField.type('something');
   RegistrationPage.registerButton.click();
   RegistrationPage.toastMessage.should("contain", "Registration completed successfully. You can now log in.")
  });

  it("Login", () => {
    HomePage.accountButton.click();
    HomePage.loginButton.click();
    LoginPage.assertIsCurrentPage();
    LoginPage.emailInput.type("demo");
    LoginPage.passwordInput.type("demo")
    LoginPage.loginButton.click();
    HomePage.assertIsCurrentPage();
    HomePage.accountButton.click();
    HomePage.goToUserProfile.should("contain", "demo");
  });
});
describe("Juice-shop", () => {

  beforeEach(() =>{
    cy.login('demo', 'demo');
    HomePage.visit();
  })
 
  it("Login", () => {
    HomePage.accountButton.click();
    HomePage.goToUserProfile.should("contain", "demo");
  });

  it("Search and validate lemon", () => {
    //search for lemon
    HomePage.searchButton.click();
    HomePage.searchInputField.type("Lemon{enter}")
    //Click on lemon
    HomePage.productCardName.contains("Lemon").click();
    //validate - sour but full of vitamins.
    HomePage.productCardDialogBox.should("contain", "Sour but full of vitamins.");
  });

  it("Search 500ml and validate lemon", () => {
    //search for 500ml
    HomePage.searchButton.click();
    HomePage.searchInputField.type("500ml{enter}")
    //click lemon
    HomePage.productCardName.contains("Lemon").click();
    //validate - sour but full of vitamins.
    HomePage.productCardDialogBox.should("contain", "Sour but full of vitamins.");
  });

  it("Search 500ml and validate all cards", () => {
    //search for 500ml
    HomePage.searchButton.click();
    HomePage.searchInputField.type("500ml{enter}")
    //egg
    HomePage.productCardName.contains("Eggfruit").click();
    HomePage.productCardDialogBox.should("contain", "Now with even more exotic flavour.");
    HomePage.productCardDialogBoxCloseButton.click();
    //lemon
    HomePage.productCardName.contains("Lemon").click();
    HomePage.productCardDialogBox.should("contain", "Sour but full of vitamins.");
    HomePage.productCardDialogBoxCloseButton.click();
    //straw
    HomePage.productCardName.contains("Strawberry").click();
    HomePage.productCardDialogBox.should("contain", "Sweet & tasty!");
  });

  it("Read review for King", () => {
    //search for King
    HomePage.searchButton.click();
    HomePage.searchInputField.type("King{enter}")
    //click King card
    HomePage.productCardName.contains("King").click();
    HomePage.expandReviews.wait(500).click();
    //validate
    HomePage.comments.should("contain", "K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!");
  });
  
  it("Add review for Raspberry", () => {
    //search for King
    HomePage.searchButton.click();
    HomePage.searchInputField.type("Raspberry{enter}")
    //click King card
    HomePage.productCardName.contains("Raspberry").click().wait(500);

    HomePage.reviewField.type("NICEEEEEEEEE")
    HomePage.submitButton.click();

    HomePage.expandReviews.wait(500).click();
    HomePage.comments.should("contain", "NICEEEEEEEEE");
  });

  it("Add adress", () => {
    SavedAddressesPage.visit();
    SavedAddressesPage.addNewAddressButton.click();
    CreateAddressesPage.assertIsCurrentPage();
    CreateAddressesPage.countryInput.type("USA");
    CreateAddressesPage.nameField.type("Markuss");
    CreateAddressesPage.numberField.type("1234567890");
    CreateAddressesPage.zipField.type("73432");
    CreateAddressesPage.addressField.type("New York");
    CreateAddressesPage.cityField.type("Somewhere");
    CreateAddressesPage.stateField.type("Nowhere");
    CreateAddressesPage.submitButton.click();
    CreateAddressesPage.toastMessage.should("contain", "The address Somewhere has been successfully added to your addresses.")
    SavedAddressesPage.rows.contains("USA").should("contain", "New York");
  });

  it("Add payment", () => {
    SavedPaymentsMethods.visit();
    SavedPaymentsMethods.addNewCardButton.click();

    SavedPaymentsMethods.cardInfoInput("Name").type("SomerandomName");
    SavedPaymentsMethods.cardInfoInput("Card Number").type("1234567890123456");
    SavedPaymentsMethods.cardInfoMenuInput("Expiry Month").select("2");
    SavedPaymentsMethods.cardInfoMenuInput("Expiry Year").select("2090");
    SavedPaymentsMethods.submitButton.click();
    SavedPaymentsMethods.toastMessage.should('contain', 'Your card ending with 3456 has been saved for your convenience.');
  
    SavedPaymentsMethods.rows
      .contains("SomerandomName")
      .parent()
      .should('contain', '************3456');
  });

  it.only("Increase wallet balance", () => {
    WalletPage.visit();
    WalletPage.walletBalance.should("be.visible").then(el =>{
      cy.wrap(el.text()).as("staringValue");
      //cy.log(el.text())
    });
    const addedValue = 100;
    WalletPage.amountInput.type(100);
    WalletPage.submitButton.click();
    
    WalletPaymentPage.assertIsCurrentPage();
    WalletPaymentPage.choosePaymentMethod("Tim Tester");
    WalletPaymentPage.continueButton.click();

    WalletPaymentPage.toastMessage.should('contain', 'Wallet successfully charged.');
    WalletPage.assertIsCurrentPage();
    
    WalletPage.walletBalance.should('be.visible').then((el) => {
      cy.get("@staringValue").then((staringValue) => {{
        expect(parseFloat(el.text())).to.eq(
          parseFloat(staringValue) + addedValue
          );
      }})
    })
  });
});