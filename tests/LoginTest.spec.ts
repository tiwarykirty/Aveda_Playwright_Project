import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
});

test("Login should be successful", async () => {
    await loginPage.performLogin();
})