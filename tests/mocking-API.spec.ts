import { expect, test } from '@playwright/test'
import tags from '../test-data/tags.json'

test.beforeEach(async ({ page }) => {
    await page.route('*/**/api/tags', async route => {

        await route.fulfill({
            json: tags
        })
    })
    await page.goto('https://conduit.bondaracademy.com/')
})
test('first', async ({ page }) => {
    await expect(page.locator('.navbar-brand')).toContainText('conduit')
    await expect(page.locator('.sidebar .tag-pill')).toContainText(['Automation', 'playwright', 'API'])

})
