import { faker } from '@faker-js/faker'
import { test } from '@playwright/test'


test.describe('test retries ', () => {
    // this will oeverride the retries setting done in playwright.config.ts
    test.describe.configure({ retries: 4 })
    test.beforeEach(async ({ page }) => {
        await page.goto('/')

    })
    test('generate random test data', async ({ page }, testinfo) => {

        if (testinfo.retry) {
            // add cleanup steps here if step in case of test retry
            // meaning if test fail then retry will be executed
            // but if earlier executed test did not complete or test data is messed
            // then add clean up step or steps to give fresh execution of test
        }
        const randomName = faker.person.fullName()
        console.log(randomName)
        const randomemail = faker.internet.email({ provider: 'test.com' })
        console.log(randomemail)
    })

})
