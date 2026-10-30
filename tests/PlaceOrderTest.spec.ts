import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';

test("Place an Order for Sauce Lab BackPack", async ({ page }) => {


    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const orderConfirmationPage = new OrderConfirmationPage(page);

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