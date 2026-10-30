import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;
let checkoutOverviewPage: CheckoutOverviewPage;
let orderConfirmationPage: OrderConfirmationPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    orderConfirmationPage = new OrderConfirmationPage(page);
});

test("Place an Order for Sauce Lab BackPack", async () => {
    await loginPage.performLogin();
    await inventoryPage.verifyBackPackAndAddtoCart();
    await inventoryPage.clickOnCartButton();
    await cartPage.verifyCartQuantity();
    await cartPage.clickOnCheckoutButton();
    await checkoutPage.fillCheckoutFormDetailsAndClickOnContinueButton("Test", "Tester", "123456");
    await checkoutOverviewPage.performCheckoutFlowForSLBackpack();
    await orderConfirmationPage.verifySuccessMessage();
    await orderConfirmationPage.verifyPDFDownload();
})