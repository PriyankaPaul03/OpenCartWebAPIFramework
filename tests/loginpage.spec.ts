import { HomePage } from "../src/pages/HomePage";
import { LoginPage } from "../src/pages/LoginPage";
import { test, expect } from '@playwright/test';

    let loginpage : LoginPage;
    let homepage : HomePage;

    test.beforeEach(async({page}) => {
        loginpage = new LoginPage(page);
        await loginpage.goToLoginPage();
        homepage = new HomePage(page);

    })


    test.skip('login page title test', async() => {
        const pageTitle = await loginpage.getPageTitle();
        console.log(pageTitle);
    });

    test.skip('forget pwd link exist test', () => {
        expect( loginpage.isForgotPasswordLinkExists()).toBeTruthy();
    })

    test.skip('user is able to login', async() => {
        await loginpage.doLogin('testingautomation@gmail.com', 'pw123');
        expect.soft(await homepage.isLogoutLinkExists()).toBeTruthy();
        expect.soft(await homepage.getPageTitle()).toBe('My Account');

    })