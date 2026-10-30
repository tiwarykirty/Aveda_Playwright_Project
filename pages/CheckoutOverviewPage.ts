import { Page, Locator, expect } from '@playwright/test';

export class CheckoutOverviewPage {

    paymentInfoValue: Locator;
    shippingInfoValue: Locator;
    totalCost: Locator;
    itemCost: Locator;
    taxCost: Locator;
    checkOutTitle: Locator;
    inventoryPrice: Locator;
    finishButton: Locator;

    constructor(private readonly page: Page) {
        this.paymentInfoValue = page.getByTestId('payment-info-value');
        this.shippingInfoValue = page.getByTestId('shipping-info-value');
        this.totalCost = page.getByTestId('total-label');
        this.itemCost = page.getByTestId('subtotal-label');
        this.taxCost = page.getByTestId('tax-label');
        this.checkOutTitle = page.locator('.title');
        this.inventoryPrice = page.getByTestId('inventory-item-price');
        this.finishButton = page.locator('#finish');
    }


    async verifyCheckoutOverviewPage(): Promise<void> {
        await expect(this.checkOutTitle).toHaveText('Checkout: Overview');
    }



    async verifyInventoryPriceAndItemPrice(): Promise<void> {
        const inventoryPrice = await this.getPriceInCents(this.inventoryPrice);
        const itemPrice = await this.getPriceInCents(this.itemCost);

        expect(itemPrice).toBe(inventoryPrice);
    }

    async verifyTotalPrice(): Promise<void> {
        const itemPrice = await this.getPriceInCents(this.itemCost);
        const tax = await this.getPriceInCents(this.taxCost);
        const total = await this.getPriceInCents(this.totalCost);

        expect(itemPrice + tax).toBe(total);
    }

    private async getPriceInCents(locator: Locator): Promise<number> {
        const text = await locator.innerText();
        const amount = text.match(/\d[\d,]*(?:\.\d{1,2})?/);

        if (!amount) {
            throw new Error(`Could not find a price in: "${text}"`);
        }

        return Math.round(Number(amount[0].replace(/,/g, '')) * 100);
    }

    async verifyCardAndShippingInformation(): Promise<void> {
        await expect(this.paymentInfoValue).toContainText("SauceCard")
        await expect(this.shippingInfoValue).toContainText('Express Delivery!');
    }

    async clickOnFinishButton(): Promise<void> {
        await this.finishButton.click();
    }

    async performCheckoutFlowForSLBackpack(): Promise<void> {
        await this.verifyCheckoutOverviewPage();
        await this.verifyCardAndShippingInformation();
        await this.verifyInventoryPriceAndItemPrice();
        await this.verifyTotalPrice();
        await this.clickOnFinishButton();
    }

}