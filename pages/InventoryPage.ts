import { Page, Locator, expect } from "@playwright/test";
export class InventoryPage {

    private readonly sauceLabBackPack: Locator;
    private readonly slbAddtoCartButton: Locator;
    private readonly cartButton: Locator;
    private readonly removeBackPack: Locator;
    private readonly cartBadge: Locator;

    constructor(private readonly page: Page) {
        this.sauceLabBackPack = page.locator("//div[contains(text(),'Sauce Labs Backpack')]");
        this.slbAddtoCartButton = page.locator("#add-to-cart-sauce-labs-backpack");
        this.cartButton = page.locator("#shopping_cart_container");
        this.removeBackPack = page.locator("#remove-sauce-labs-backpack");
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    async verifyBackPackAndAddtoCart(): Promise<void> {
        await expect(this.sauceLabBackPack).toHaveText("Sauce Labs Backpack");
        await this.slbAddtoCartButton.click();
        await expect(this.cartBadge).toHaveText('1');
    }

    async removeBackPackFromCart(): Promise<void> {
        await expect(this.cartBadge).toHaveText('1');
        await this.removeBackPack.click();
        await expect(this.cartBadge).toBeHidden();
        await expect(this.slbAddtoCartButton).toBeVisible();
    }

    async clickOnCartButton(): Promise<void> {
        await this.cartButton.click();
    }



}