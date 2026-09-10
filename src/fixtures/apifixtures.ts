import { test as baseTest } from '@playwright/test' ;
import { ApiHelper } from '../api/ApiHelper';



// define type of API fixtures
type ApiFixtures = {
    apiHelper: ApiHelper;
};



// extend playwright base test
export let test = baseTest.extend <ApiFixtures> ({

    apiHelper: async( { request }, use) => {
        let apiHelper = new ApiHelper(
            request,
            process.env.API_BASEURL!
        );
        await use(apiHelper);
    },
}); 

export {expect} from '@playwright/test';    