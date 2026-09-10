import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    // private locators
    private readonly logoutLink : Locator;
    private readonly headers : Locator;


    // initialize the var
    constructor(page:Page){
        super(page);
        this.logoutLink = page.getByRole('link', {name: 'Logout'});
        this.headers = page.getByRole('heading', {level: 2});
    }

    // public page action / methods

    async isLogoutLinkExists() : Promise<boolean> {
        return await this.logoutLink.isVisible();
    }

    async getHomePageHeaders() : Promise<string[]> {
        return await this.headers.allInnerTexts();
    }

    async doSearch(searchkey:string) : Promise<void>{
        console.log('searching the product:' + `${searchkey}`);
        await this.searchBox.fill(searchkey);
        await this.searchIcon.click();
    }

}