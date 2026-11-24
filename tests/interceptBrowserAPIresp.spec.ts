import { expect, test } from '@playwright/test'


test('post and delete request', async ({ page, request }) => {
    // get login token
    // POST using API
    const loginresponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { "user": { "email": "admin@abc.com", "password": "asDF!@34" } }
    })

    expect(loginresponse.status()).toBe(200)
    const loginJSON = await loginresponse.json()
    const token = loginJSON.user.token
    console.log(token)

    // create new article with UI
    await page.goto('https://conduit.bondaracademy.com/')
    // await page.getByRole('link', { name: 'Sign in' }).click()
    // await page.getByPlaceholder('Email').fill('admin@abc.com')
    // await page.getByPlaceholder('Password').fill('asDF!@34')
    // await page.getByRole('button', { name: 'Sign in' }).click()
    await page.getByRole('link', { name: 'New Article' }).click()
    await page.getByRole('textbox', { name: 'Article Title' }).fill('two')
    await page.locator('[formcontrolname="description"]').fill('two')
    await page.locator('[formcontrolname="body"]').fill('two')
    await page.getByText('Publish Article').click()
    const newarticleresponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
    expect(newarticleresponse.status()).toBe(201)

    const newarticleresponseJson = await newarticleresponse.json()
    const slugId = newarticleresponseJson.article.slug
    console.log(slugId)

    // Delete using api
    const deleterespoinse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
        headers: {
            Authorization: `Token ${token}`
        }
    })
    expect(deleterespoinse.status()).toBe(204)
})
test('post and delete request2', async ({ page, request }) => {
    const loginresponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { "user": { "email": "admin@abc.com", "password": "asDF!@34" } }
    })

    expect(loginresponse.status()).toBe(200)
    const loginJSON = await loginresponse.json()
    const token = loginJSON.user.token
    console.log(token)
    await page.goto('https://conduit.bondaracademy.com/')
    await page.getByRole('link', { name: 'New Article' }).click()
    await page.getByRole('textbox', { name: 'Article Title' }).fill('three')
    await page.locator('[formcontrolname="description"]').fill('three')
    await page.locator('[formcontrolname="body"]').fill('three')
    await page.getByText('Publish Article').click()
    const newarticleresponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
    expect(newarticleresponse.status()).toBe(201)

    const newarticleresponseJson = await newarticleresponse.json()
    const slugId = newarticleresponseJson.article.slug
    console.log(slugId)

    // Delete using api
    const deleterespoinse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
        headers: {
            Authorization: `Token ${token}`
        }
    })
    expect(deleterespoinse.status()).toBe(204)
})
