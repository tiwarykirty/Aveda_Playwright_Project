import { chromium, defineConfig, devices } from "@playwright/test";
import { config } from 'dotenv';
config();
export default defineConfig({
    testDir: './tests',
    use: {
        headless: false,
        baseURL: process.env.BASE_URL,
    },
    reporter: [["html", { open: "always" }]],
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // {
        //     name: 'webkit',
        //     use: { ...devices['Desktop Safari'] },
        // },
        // {
        //     name: 'firefox',
        //     use: { ...devices['Desktop Firefox'] }
        // },
    ],
});