import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
});

test("Adds backpack, removes it, then adds it again and verifies the cart", async ({ page }) => {
    await loginPage.performLogin();
    await inventoryPage.verifyBackPackAndAddtoCart();
    await inventoryPage.removeBackPackFromCart();
    await inventoryPage.verifyBackPackAndAddtoCart();
    await inventoryPage.clickOnCartButton();

    await expect(page.locator("//div[@class='inventory_item_name']")).toHaveText("Sauce Labs Backpack");
    await expect(page.locator("//div[@class='cart_quantity']")).toHaveText('1');
    await expect(page.locator("#checkout")).toBeEnabled();
})