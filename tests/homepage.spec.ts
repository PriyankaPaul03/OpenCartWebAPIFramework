
import { test, expect } from '@playwright/test';
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";
import { beforeEach } from 'node:test';

    let loginpage : LoginPage;
    let homepage: HomePage;

    // inside before each block we have destrcture page object so no need to use page in each testcases...
    test.beforeEach(async({page}) => {
        loginpage = new LoginPage(page);
        await loginpage.goToLoginPage();
        await loginpage.doLogin('testingautomation@gmail.com', 'pw123');
        homepage = new HomePage(page);
    })

    test('home page title', async({ })=> {
        let pagetitle = await homepage.getPageTitle();
        console.log(pagetitle);
        expect(pagetitle).toBe('My Account');
    });

    test('logout link is visible', async() => {
        expect(await homepage.isLogoutLinkExists()).toBeTruthy();
    });

    test('home page header exist test', async() => {
        let allHeaders = await homepage.getHomePageHeaders();
        console.log(allHeaders);
        expect(allHeaders).toHaveLength(4);
        expect(allHeaders).toEqual([
            'My Account',
            'My Orders',
            'My Affiliate Account',
            'Newsletter'
        ])
    });

