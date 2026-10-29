import { test, expect } from "@playwright/test";

test("Opens browser and launches playwright url", async ({ page }) => {

    await page.goto("https://playwright.dev/");
    await expect(page).toHaveTitle(/Playwright/);

    const heading = page.getByRole('heading', { level: 1 });
    console.log(await heading.textContent());
    await expect(heading).toBeVisible();

    await expect(heading).toContainText('Playwright enables reliable web automation for testing, scripting, and AI agents.');

    const getStarted_Button = page.getByRole('link', { name: 'Get started' });
    await getStarted_Button.click();
    await expect(page).toHaveURL(/docs\/intro/);

    await expect(page.getByRole('heading', { level: 1 })).toHaveText("Installation");

})

test("Register a user", async ({ page }) => {
    await page.goto("https://www.playwrightautomation.com/register.html");

    const firstName_InputBox = page.locator('#firstName');
    const lastName_InputBox = page.locator('#lastName');
    await firstName_InputBox.fill('Jane');
    await lastName_InputBox.fill('Doe');

    const email_InputBox = page.locator('#email');
    const phone_InputBox = page.locator('#phone');

    const randomEmail = `test-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`;
    await email_InputBox.fill(randomEmail);
    await phone_InputBox.fill("1234567890");

    const occupationDropDown = page.locator('#occupation');
    await occupationDropDown.selectOption({ value: 'sdet' });

    const genderRadioButton = page.locator("#genderMale");
    await genderRadioButton.check();
    await expect(genderRadioButton).toBeChecked();

    const paswwordInput = page.locator("#password");
    const confirmPassword = page.locator("#confirmPassword");

    await paswwordInput.fill("Test!123");
    await confirmPassword.fill("Test!123");

    const passwordToastSuccess = page.locator("#confirmPasswordMatch");
    await expect(passwordToastSuccess).toContainText("Passwords match");



    const ageCheckbox = page.locator("#ageConfirm");
    const marketingOption = page.locator("#marketingOptIn");

    await ageCheckbox.check();
    await marketingOption.check();
    await expect(ageCheckbox).toBeChecked();
    await expect(marketingOption).toBeChecked();

    const Registerbutton = page.getByRole('button', { name: 'Register' });
    await Registerbutton.click();

    await page.waitForTimeout(5000);

    const successMessage = page.getByRole('heading', { level: 2 });
    await expect(successMessage).toHaveText('Registration Successful');

    const registeredEmailId = page.locator("#registerSuccessEmail");
    await expect(registeredEmailId).toHaveText(randomEmail);
})