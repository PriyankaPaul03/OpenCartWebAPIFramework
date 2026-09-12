import { test, expect } from '../src/fixtures/pagefixtures';
import { BasePage } from '../src/pages/BasePage';
import { CsvHelper } from '../src/utils/CsvHelper';


    test.beforeEach(async({ loginPage }) => {
        await loginPage.goToLoginPage();
        await loginPage.doLogin(process.env.USER_EMAIL!, process.env.PASSWORD!);
    })

    test('verify product images count', async({homePage, searchResultsPage, productInfoPage}) => {
        await homePage.doSearch('macbook');
        await searchResultsPage.selectProduct('MacBook Pro');
        expect(await productInfoPage.getProductImgCount()).toBe(4);

    });

    //common test
    test('comp logo exists on product page', async({basePage}) => {
        expect(await basePage.isLogoVisible()).toBeTruthy();
    })

    test('footers exists on product page', async({basePage}) => {
        expect(await basePage.getFootersCount()).toBe(16);
    })

    test('verify product information/data ', async({homePage, searchResultsPage, productInfoPage}) => {
        await homePage.doSearch('macbook');
        await searchResultsPage.selectProduct('MacBook Pro');
        let actualproductinfo = await productInfoPage.getProductInfo();
        console.log('Actual Product Info :', actualproductinfo);
        expect.soft(actualproductinfo.get('ProductHeader')).toBe('MacBook Pro');
        expect.soft(actualproductinfo.get('Brand')).toBe('Apple');
        expect.soft(actualproductinfo.get('Product Code')).toBe('Product 18');
        expect.soft(actualproductinfo.get('Reward Points')).toBe('800');
        expect.soft(actualproductinfo.get('Availability')).toBe('Out Of Stock');
        expect.soft(actualproductinfo.get('ProductPrice')).toBe('$2,000.00');
        expect.soft(actualproductinfo.get('ExTaxPrice')).toBe('$2,000.00');

    });

    
    //read the date from csv file
    let productInfo = CsvHelper.readCsv('src/testdata/productInfo.csv');
    for(let row of productInfo){
        test(`verify products details data from csv file -- ${row.searchkey} ${row.expecteddata}`, async({homePage, searchResultsPage, productInfoPage}) => {
            await homePage.doSearch(row.searchkey);
            await searchResultsPage.selectProduct(row.productname);
            let actualproductinfo = await productInfoPage.getProductInfo();
            console.log('Actual Product Info :', actualproductinfo);
            expect.soft(actualproductinfo.get('ProductHeader')).toBe(row.expecteddata);
        });
    }