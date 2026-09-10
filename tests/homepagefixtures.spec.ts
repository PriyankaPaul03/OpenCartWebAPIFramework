
import { test, expect } from '../src/fixtures/pagefixtures';


    test.beforeEach(async({ loginPage }) => {
        await loginPage.goToLoginPage();
        await loginPage.doLogin('testingautomation@gmail.com', 'pw123');
    })

    test('home page title', async({ homePage })=> {
        let pagetitle = await homePage.getPageTitle();
        console.log(pagetitle);
        expect(pagetitle).toBe('My Account');
    });

    test('logout link is visible', async( { homePage }) => {
        expect(await homePage.isLogoutLinkExists()).toBeTruthy();
    });

 //common test
    test('comp logo exists on product page', async({basePage}) => {
        expect(await basePage.isLogoVisible()).toBeTruthy();
    })

    test('footers exists on product page', async({basePage}) => {
        expect(await basePage.getFootersCount()).toBe(16);
    })

    test('home page header exist test', async( { homePage}) => {
        let allHeaders = await homePage.getHomePageHeaders();
        console.log(allHeaders);
        expect(allHeaders).toHaveLength(4);
        expect(allHeaders).toEqual([
            'My Account',
            'My Orders',
            'My Affiliate Account',
            'Newsletter'
        ])
    });

