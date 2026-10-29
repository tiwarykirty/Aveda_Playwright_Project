import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test("Login should be successful", async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.performLogin();


})