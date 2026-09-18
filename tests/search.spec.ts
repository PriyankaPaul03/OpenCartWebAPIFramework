import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';


    test.beforeEach(async({ loginPage }) => {
        await loginPage.goToLoginPage();
        await loginPage.doLogin(process.env.USER_EMAIL!, process.env.PASSWORD!);
    })

    test('verify search product count', async({homePage, searchResultsPage}) => {
        await homePage.doSearch('macbook');
        expect(await searchResultsPage.getProductSearchResultsCount()).toBe(3);
    });

    test('verify user is able to land on the product details page', async({homePage, searchResultsPage, page}) => {
        await homePage.doSearch('macbook');
        await searchResultsPage.selectProduct('MacBook Pro');
        expect(await page.title()).toBe('MacBook Pro');
    });

    
    //read the date from csv file
    const productData = CsvHelper.readCsv('src/testdata/products.csv');
        
    for(const row of productData){
        test.skip(`@regression verify search product count -- ${row.searchkey}, ${row.productnames}`, async({homePage, searchResultsPage}) => {
            await homePage.doSearch(row.searchkey);
            expect(await searchResultsPage.getProductSearchResultsCount()).toBe(Number(row.resultcount));
        });
    };


    for(const row of productData){
        test(`@regression verify user is able to land on the product details page -- ${row.searchkey}, ${row.productnames}`, async({homePage, searchResultsPage, page}) => {
            await homePage.doSearch(row.searchkey);
            await searchResultsPage.selectProduct(row.productname);
            expect(await page.title()).toBe(row.productname);
        });
    
    }



