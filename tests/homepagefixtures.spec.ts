
import { test, expect } from '../src/fixtures/pagefixtures';


    test.beforeEach(async({ loginPage }) => {
        await loginPage.goToLoginPage();
        await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
    })

    test('@smoke home page title', async({ homePage })=> {
        let pagetitle = await homePage.getPageTitle();
        console.log(pagetitle);
        expect(pagetitle).toBe('My Account');
    });

    test('@smoke logout link is visible', async( { homePage }) => {
        expect(await homePage.isLogoutLinkExists()).toBeTruthy();
    });

 //common test
    test('@smoke comp logo exists on product page', async({basePage}) => {
        expect(await basePage.isLogoVisible()).toBeTruthy();
    })

    test('@smoke footers exists on product page', async({basePage}) => {
        expect(await basePage.getFootersCount()).toBe(16);
    })

    test('@regression home page header exist test', async( { homePage}) => {
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

