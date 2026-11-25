import {faker} from '@faker-js/faker'
import {test} from '@playwright/test'

test('generate random test data',async({page})=>{
    const randomName = faker.person.fullName()
    console.log(randomName)
    const randomemail = faker.internet.email({provider:'test.com'})
    console.log(randomemail)
})