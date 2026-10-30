import { Page, expect, Locator } from '@playwright/test';

export class CartPage {

    private readonly checkoutButton: Locator;
    private readonly cartQuantity: Locator;
    private readonly cartProductName: Locator;

    constructor(private readonly page: Page) {
        this.checkoutButton = page.locator("#checkout");
        this.cartQuantity = page.locator('.cart_quantity');
        this.cartProductName = page.locator('.inventory_item_name');
    }

    async verifyCartQuantity(): Promise<number> {
        const cartQuantityText = await this.cartQuantity.innerText();
        const quantity = Number.parseInt(cartQuantityText, 10);
        expect(quantity).toBeGreaterThanOrEqual(1);
        return quantity;
    }

    async verifyCartProduct(productName: string): Promise<void> {
        await expect(this.cartProductName).toContainText(productName);
    }

    async clickOnCheckoutButton(): Promise<void> {
        const cartItems = await this.verifyCartQuantity();
        await this.verifyCartProduct('Sauce Labs Backpack');
        expect(cartItems).toBeGreaterThanOrEqual(1);
        await this.checkoutButton.click();
    }

}