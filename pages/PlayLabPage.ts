import { Page, FrameLocator, Locator, expect } from "@playwright/test";

export class PlayLabPage {

    private readonly url: string;
    private readonly formFrame: FrameLocator;
    private readonly iframeElement: Locator;

    // Form field locators - centralized
    private readonly nameInput: Locator;
    private readonly messageInput: Locator;
    private readonly priorityDropdown: Locator;
    private readonly urgentCheckbox: Locator;
    private readonly submitButton: Locator;

    constructor(private readonly page: Page) {
        this.url = "https://playwrightlab.github.io/";
        this.formFrame = page.frameLocator("//iframe[@id='practiceFrame']");
        this.iframeElement = page.locator("//iframe[@id='practiceFrame']");

        // Initialize all locators
        this.nameInput = this.formFrame.locator("#iframeName");
        this.messageInput = this.formFrame.locator("#iframeMessage");
        this.priorityDropdown = this.formFrame.locator("#iframePriority");
        this.urgentCheckbox = this.formFrame.locator("#iframeUrgent").nth(0);
        this.submitButton = this.formFrame.locator("#iframeSubmitBtn");
    }

    async navigateToPlayWrightLab(): Promise<void> {
        await this.page.goto(this.url, { waitUntil: 'networkidle' });
        await this.scrollToIframe();
    }

    async scrollToIframe(): Promise<void> {
        await this.iframeElement.scrollIntoViewIfNeeded();
    }

    // Individual input methods
    async fillName(name: string): Promise<void> {
        await this.nameInput.fill(name);
    }

    async fillMessage(message: string): Promise<void> {
        await this.messageInput.fill(message);
    }

    async selectPriority(priority: string): Promise<void> {
        await this.priorityDropdown.selectOption(priority);
    }

    async checkUrgent(): Promise<void> {
        await this.urgentCheckbox.check();
    }

    async clickSubmit(): Promise<void> {
        await this.submitButton.click();
    }

    // Combined form interaction
    async interactWithFormIframe(): Promise<void> {
        await this.fillName("Test");
        await this.fillMessage("This is my first interaction with iframes");
        await this.selectPriority("High");
        await this.checkUrgent();
        await this.submitForm();
    }

    async submitForm(): Promise<void> {
        await this.clickSubmit();
    }

    // Verification methods
    async verifyNameField(expectedValue: string): Promise<void> {
        await expect(this.nameInput).toHaveValue(expectedValue);
    }

    async verifyMessageField(expectedValue: string): Promise<void> {
        await expect(this.messageInput).toHaveValue(expectedValue);
    }

    async verifyPrioritySelection(expectedValue: string): Promise<void> {
        await expect(this.priorityDropdown).toHaveValue(expectedValue);
    }

    async verifyUrgentIsChecked(): Promise<void> {
        await expect(this.urgentCheckbox).toBeChecked();
    }

    // Flexible form fill method with built-in verification
    async fillFormWithOptions(name: string, message: string, priority: string, shouldCheckUrgent: boolean = true): Promise<void> {
        // Fill and verify name
        await this.fillName(name);
        await this.verifyNameField(name);

        // Fill and verify message
        await this.fillMessage(message);
        await this.verifyMessageField(message);

        // Select and verify priority
        await this.selectPriority(priority);
        await this.verifyPrioritySelection(priority.toLowerCase());

        // Check and verify urgent checkbox
        if (shouldCheckUrgent) {
            await this.checkUrgent();
            await this.verifyUrgentIsChecked();
        }

        // Submit form
        await this.submitForm();
    }
}
