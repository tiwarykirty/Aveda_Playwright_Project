import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {

    private readonly CheckoutPageTitle: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly zipCodeInput: Locator;
    private readonly continueButton: Locator;

    constructor(private readonly page: Page) {
        this.CheckoutPageTitle = page.locator('.title');
        this.firstNameInput = page.locator("#first-name");
        this.lastNameInput = page.locator("#last-name");
        this.zipCodeInput = page.locator("#postal-code");
        this.continueButton = page.locator("#continue");
    }

    async verifyCheckoutPage(): Promise<void> {
        await expect(this.CheckoutPageTitle).toHaveText("Checkout: Your Information");
        await expect(this.page).toHaveURL(/checkout-step-one/);
    }

    async enterFirstName(firstName: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await expect(this.firstNameInput).toHaveAttribute('value', firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.lastNameInput.fill(lastName);
        await expect(this.lastNameInput).toHaveAttribute('value', lastName);
    }

    async enterZipCode(zipCode: string): Promise<void> {
        await this.zipCodeInput.fill(zipCode);
        await expect(this.zipCodeInput).toHaveAttribute('value', zipCode);
    }

    async clickOnCheckoutContinueButton(): Promise<void> {
        await this.continueButton.click();
    }


    async fillCheckoutFormDetailsAndClickOnContinueButton(firstname: string, lastname: string, zipCode: string) {
        await this.verifyCheckoutPage();
        await this.enterFirstName(firstname);
        await this.enterLastName(lastname);
        await this.enterZipCode(zipCode);
        await this.clickOnCheckoutContinueButton();
    }
}