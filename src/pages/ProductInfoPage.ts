import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage {

    // private locators
    private readonly header:Locator;
    private readonly productImg:Locator;
    private readonly productMetaData:Locator;
    private readonly productPricing:Locator;
    private map: Map<string, string | number>;
    

    // initialize the var
    constructor(page:Page){
        super(page);
        this.header = page.getByRole('heading', { name: 'MacBook Pro', level: 1 });
        this.productImg = page.locator('div#content li img');
        this.productMetaData = page.locator('div#content .list-unstyled:nth-of-type(1) li');
        this.productPricing = page.locator('div#content .list-unstyled:nth-of-type(2) li');
        this.map = new Map<string, string | number>();
    }

    // public page action / methods
    async getProductHeader():Promise<string>{
        return await this.header.innerText();
    }

    async getProductImgCount(): Promise<number>{
        //await this.page.waitForTimeout(4000);
        await this.productImg.first().waitFor({state: 'visible'});
        return await this.productImg.count();
    }

    /**
     * 
     * @return  this method is returning the actual product info lik header, count, metadata, pricing
     *
     */
    async getProductInfo(): Promise<Map<string, string | number>> {
        this.map.set('ProductHeader', await this.getProductHeader());
        this.map.set('ProductImage', await this.getProductImgCount());
        await this.getProductMetaData();
        await this.getProductPricing();
        return this.map;
    }

    // Brand: Apple
    // Product Code: Product 18
    // Reward Points: 800
    // Availability: Out Of Stock
    private async getProductMetaData(): Promise<void>{
        let metaData = await this.productMetaData.allInnerTexts();
        for(let data of metaData){
            let meta = data.split(':');
            let metaKey = meta[0].trim();
            let metaVal = meta[1].trim();
            this.map.set(metaKey, metaVal);
        }
    }

    // $2,000.00
    // Ex Tax: $2,000.00
    private async getProductPricing(): Promise<void>{
        let priceData = await this.productPricing.allInnerTexts();
        let productPrice = priceData[0].trim();
        let exTaxPrice = priceData[1].split(':')[1].trim();
        this.map.set('ProductPrice', productPrice);
        this.map.set('ExTaxPrice', exTaxPrice);
    }

}