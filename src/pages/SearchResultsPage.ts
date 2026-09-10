import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultsPage extends BasePage {

    // private locators
    private readonly searchProducts : Locator;
    

    // initialize the var
    constructor(page:Page){
        super(page);
        this.searchProducts = page.locator('div.product-layout');
        
    }

    // public page action / methods
    async getProductSearchResultsCount(): Promise<number>{
        return await this.searchProducts.count();
    }

    async selectProduct(productName:string){
        await this.page.getByRole('link', {name: productName, exact:true}).first().click();
    }

}