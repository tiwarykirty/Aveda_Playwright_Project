import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {

    private readonly userNameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly sauceLabHeading: Locator;
    private readonly username: string;
    private readonly password: string;

    constructor(private readonly page: Page) {
        const username = process.env.SAUCE_USERNAME;
        const password = process.env.SAUCE_PASSWORD;

        if (!username || !password) {
            throw new Error('Set SAUCE_USERNAME and SAUCE_PASSWORD in your .env file.');
        }
        this.username = username;
        this.password = password;

        this.userNameInput = page.locator("#user-name");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.locator("#login-button");
        this.sauceLabHeading = page.locator("//div[text()='Swag Labs']")
    }

    async enterUsername(username: string): Promise<void> {
        await this.userNameInput.fill(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickOnLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async goToLoginPage(): Promise<void> {
        await this.page.goto('/');
        await expect(this.page).toHaveTitle("Swag Labs");
        await expect(this.sauceLabHeading).toContainText("Swag Labs");
    }

    async performLogin(): Promise<void> {
        await this.goToLoginPage();
        await this.enterUsername(this.username);
        await this.enterPassword(this.password);
        await this.clickOnLoginButton();

        await expect(this.page).toHaveURL(/\/inventory\.html$/);
        await expect(this.page.getByText('Products', { exact: true })).toBeVisible();
    }

}