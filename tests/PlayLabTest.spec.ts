import { test } from '@playwright/test';

import {
    PlayLabPage
} from '../pages/PlayLabPage';

test("Interact with a from inside a frame", async ({ page }) => {
    const playLabPage = new PlayLabPage(page);
    await playLabPage.navigateToPlayWrightLab();
    await playLabPage.fillFormWithOptions('TEST', 'My first form Interaction', 'High', true);
})