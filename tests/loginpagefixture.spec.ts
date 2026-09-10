import { test, expect } from '../src/fixtures/pagefixtures';
import { LoginPage } from '../src/pages/LoginPage';
import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JsonHelper';


    test.beforeEach(async({loginPage}) => {
        await loginPage.goToLoginPage();
    })

    test('login page title test', async( {loginPage }) => {
        const pageTitle = await loginPage.getPageTitle();
        console.log(pageTitle);
    });

    test('forget pwd link exist test', ({ loginPage }) => {
        expect( loginPage.isForgotPasswordLinkExists()).toBeTruthy();
    })

    test('user is able to login', async({ loginPage, homePage} ) => {
        await loginPage.doLogin(process.env.USER_EMAIL!, process.env.PASSWORD!);
        expect.soft(await homePage.isLogoutLinkExists()).toBeTruthy();
        expect.soft(await homePage.getPageTitle()).toBe('My Account');

    })

     //common test
    test('comp logo exists on product page', async({basePage}) => {
        expect(await basePage.isLogoVisible()).toBeTruthy();
    })

    test('footers exists on product page', async({basePage}) => {
        expect(await basePage.getFootersCount()).toBe(16);
    })

    
    //DD-1: with fixture -> sequence mode - 1 test is running with testdate one by one -- more time consumed, report lengthly
    test('login to the app using wrong credentials with data driven approch', async({ loginPage, testData }) => {

        for(let row of testData){
            await loginPage.doLogin(row.username, row.password);
            expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
        }
        
    })

    
    // DD-2: parallel mode-> without fixtures -> read csv data directly and loop the test method row wise
    let testData = CsvHelper.readCsv('src/testdata/loginData.csv');
    
        for(let row of testData){

            test(`invalid login test with -- ${row.username}, ${row.password}`, async({ loginPage }) => {
                await loginPage.doLogin(row.username, row.password);
                expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
        })

    }

    // Excel file
    // DD-2: parallel mode-> without fixtures -> read csv data directly and loop the test method row wise
    let LoginTestData = ExcelHelper.readExcel('src/testdata/OpenCartTestData.xlsx', 'login');
        
        for(let row of LoginTestData){
            test(`invalid login test with excel file -- ${row.username}`, async({ loginPage }) => {
                await loginPage.doLogin(row.username, row.password);
                expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
            })
        }


    // JSON file  
    let LoginJsonData = JsonHelper.readJson('src/testdata/loginData.json');
        
        for(let row of LoginJsonData){
            test(`invalid login test with JSON file -- ${row.username}`, async({ loginPage }) => {
                await loginPage.doLogin(row.username, row.password);
                expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
            })
        }
    