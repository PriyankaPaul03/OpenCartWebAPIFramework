import { test, expect } from '@playwright/test';


//** */ -wildcart - match all the urls

test('intercept and log reuest', async({ page}) => {

    //listener
    await page.route('**/*', async(route) => {
        console.log(route.request().method(), route.request().url());
        await route.continue();
    })

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

})


test('mock search data api', async({page})=> {

    let fakeProduct= [
        { name: 'Fake Product Pro', price: '$599'},
        { name: 'Fake iPhone', price: '$999'}
    ]

    await page.route('**/index.php?route=account/login', (route) => {
        route.fulfill ({
            status: 200,
            contentType: 'applicatio/json',
            body: JSON.stringify(fakeProduct)

        });
    })

    page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');



})