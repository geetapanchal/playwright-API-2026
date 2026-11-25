import { expect, test } from '@playwright/test'


test('post and delete request', async ({ page, request }) => {

    console.log(process.env.TESTUSER)
    // POST using API
    const loginresponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { "user": { "email": process.env.TESTUSER, "password": process.env.TESTPASSWORD } }
    })

    expect(loginresponse.status()).toBe(200)
    const loginJSON = await loginresponse.json()
    const token = loginJSON.user.token
    console.log(token)

    const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/',
        {
            data: { "article": { "title": "one", "description": "one", "body": "one", "tagList": [] } },
            headers: {
                Authorization: `Token ${token}`
            }
        }
    )
    expect(articleResponse.status()).toBe(201)

    await page.goto('/')
    await page.getByRole('link',{name:'Sign in'}).click()
    await page.getByPlaceholder('Email').fill(process.env.TESTUSER!)
    await page.getByPlaceholder('Password').fill(process.env.TESTPASSWORD!)
    await page.getByRole('button',{name:'Sign in'}).click()
    await expect(page.locator('.article-preview').first().locator('h1')).toContainText('one')
    await expect(page.locator('.article-preview').first().locator('p')).toContainText('one')

    // delete using UI
    await page.locator('.article-preview').first().locator('h1').click()
    await page.getByRole('button',{name:'Delete Article'}).first().click()
})