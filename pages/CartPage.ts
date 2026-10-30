import { Page, expect, Locator } from '@playwright/test';

export class CartPage {

    private readonly checkoutButton: Locator;
    private readonly cartQuantity: Locator;

    constructor(private readonly page: Page) {
        this.checkoutButton = page.locator("#checkout");
        this.cartQuantity = page.locator('.cart_quantity');
    }

    async verifyCartQuantity(): Promise<number> {
        const cartQuantityText = await this.cartQuantity.innerText();
        const quantity = Number.parseInt(cartQuantityText, 10);
        expect(quantity).toBeGreaterThanOrEqual(1);
        return quantity;

    }

    async clickOnCheckoutButton(): Promise<void> {
        const cartItems = await this.verifyCartQuantity();
        expect(cartItems).toBeGreaterThanOrEqual(1);
        await this.checkoutButton.click();
    }

}