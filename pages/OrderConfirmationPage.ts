import { Locator, Page, expect } from '@playwright/test';

export class OrderConfirmationPage {
    private readonly orderConfirmation: Locator;
    private readonly orderConfirmationTitle: Locator;
    private readonly generatePDFButton: Locator;

    constructor(private readonly page: Page) {
        this.orderConfirmation = page.getByTestId('complete-header');
        this.orderConfirmationTitle = page.locator('.title');
        this.generatePDFButton = page.locator('#generate-pdf-order');
    }


    async verifyPDFDownload(): Promise<void> {
        const downloadPromise = this.page.waitForEvent('download');
        await this.generatePDFButton.click();
        const download = await downloadPromise;
        expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
        expect(await download.failure()).toBeNull();
    }

    async verifySuccessMessage(): Promise<void> {
        await expect(this.orderConfirmationTitle).toContainText('Checkout: Complete!');
        await expect(this.orderConfirmation).toContainText('Thank you for your order!');
    }


}