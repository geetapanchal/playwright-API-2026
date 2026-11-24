import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs'

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page , request }) => {

    if (fs.existsSync(authFile)) {
        // get login token
        // POST using API
        const loginresponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
            data: { "user": { "email": "admin@abc.com", "password": "asDF!@34" } }
        })
        expect(loginresponse.status()).toBe(200)
        const loginJSON = await loginresponse.json()
        const token = loginJSON.user.token
        console.log(token)

        const storagestatefile = JSON.parse(fs.readFileSync(authFile,'utf-8'))
        storagestatefile.origins[0].localStorage[0].value = token
        fs.writeFileSync(authFile,JSON.stringify(storagestatefile,null,2))

    }
    else {
        // Perform authentication steps. Replace these actions with your own.
        await page.goto('https://conduit.bondaracademy.com/')
        await page.getByRole('link', { name: 'Sign in' }).click()
        await page.getByPlaceholder('Email').fill('admin@abc.com')
        await page.getByPlaceholder('Password').fill('asDF!@34')
        await page.getByRole('button', { name: 'Sign in' }).click()
        await expect(page.getByRole('link', { name: 'New Article' })).toBeVisible()
        await page.context().storageState({ path: authFile });
    }
});