import { expect, test } from '@playwright/test'

// use this login to mimic respose like the one original response you want to modify and 
// add different to test scenario

test.beforeEach(async ({ page }) => {
    await page.route('*/**/api/articles*', async route => {
        const response = await route.fetch()
        const reponseJSON = await response.json()
        reponseJSON.articles[0].title = 'this is a mock title'
        reponseJSON.articles[0].description = 'this is a mock description'
        await route.fulfill({
            json: reponseJSON
        })
    })
    await page.goto('/')
})

test('first', async ({ page }) => {
    await expect(page.locator('.preview-link h1').first()).toContainText('this is a mock title')
    await expect(page.locator('.preview-link p').first()).toContainText('this is a mock description')
})