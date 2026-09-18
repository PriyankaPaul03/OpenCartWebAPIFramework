import { test, expect } from '@playwright/test';


//** */ -wildcart - match all the urls

test('@smoke intercept and log reuest', async({ page}) => {

    //listener
    await page.route('**/*', async(route) => {
        console.log(route.request().method(), route.request().url());
        await route.continue();
    })

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

})

//intercept with mocking:
//mocking: fake data/response

test('@regression mock search data api', async({page})=> {

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

    await page.goto('https://abc.com/index.php?route=product/search&search=macbook');

    let fakeJson = await page.evaluate(async () => {
        let fakeRes = await fetch('https://abc.com/index.php?route=product/search&search=macbook')
        return await fakeRes.json();
    });

    console.log('fake json response:', fakeJson);

});

test.skip('mock search page with fake HTML', async ({ page }) => {

    await page.route('**/index.php?route=product/search&search=macbook', (route) => {
        route.fulfill({
            status: 200,
            contentType: 'text/html',
            body: `
                <html>
                <body>
                    <h1>Search Results</h1>
                    <div class="product-layout">
                        <h4><a href="#">Fake MacBook Pro</a></h4>
                        <p class="price">$599</p>
                    </div>
                    <div class="product-layout">
                        <h4><a href="#">Fake iPhone 20</a></h4>
                        <p class="price">$999</p>
                    </div>
                </body>
                </html>
            `,
        });
    });

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook');

    // now assert on the fake HTML
    const heading = await page.textContent('h1');
    expect(heading).toBe('Search Results');

    const products = await page.locator('.product-layout h4').allTextContents();
    expect(products).toEqual(["Fake MacBook Pro", "Fake iPhone 20"]);

    const prices = await page.locator('.price').allTextContents();
    expect(prices).toEqual(["$599", "$999"]);
});