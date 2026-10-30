import { Locator, Page, expect } from '@playwright/test';

export class OrderConfirmationPage {
    OrderConfirmation: Locator;
    OrderConfirmationTitle: Locator;
    GeneratePDFButton: Locator;

    constructor(private readonly page: Page) {

        this.OrderConfirmation = page.getByTestId('complete-header');
        this.OrderConfirmationTitle = page.locator('.title');
        this.GeneratePDFButton = page.locator('#generate-pdf-order');

    }


    async verifyPDFDownload(): Promise<void> {
        const downloadPromise = this.page.waitForEvent('download');
        await this.GeneratePDFButton.click();
        const download = await downloadPromise;
        expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
        expect(await download.failure()).toBeNull();
    }

    async verifySuccessMessage(): Promise<void> {
        await expect(this.OrderConfirmationTitle).toContainText('Checkout: Complete!');
        await expect(this.OrderConfirmation).toContainText('Thank you for your order!');
    }


}