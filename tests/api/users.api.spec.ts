import { test, expect } from '@playwright/test';

let AUTH_TOKEN = { Authorization: 'Bearer 3b963bdbfc9c6b6dc04929f98dc7c108d72594feba64a3a3e550422f900b12ee' };

test.skip('GET -- get user details', async({ request })=> {

    let response = await request.get('https://gorest.co.in/public/v2/users/', {
        headers: AUTH_TOKEN
    });

    let resbody = await response.json();
    console.log(resbody);

    console.log(response.status());
    console.log(response.statusText());

    expect(response.status()).toBe(200);

})

test.skip('POST -- create a user details', async({ request })=> {

    // object body
    let userdata = {
    name: "Naveen PW Automation Lab",
    //email: "naveenautomationlab@open.com",
    email: `automation_${Date.now()}@open.com`, // unique
    gender: "female",
    status: "active"
    } //8591837


    // JS object to JSON -> Serialization
    let response = await request.post('https://gorest.co.in/public/v2/users/', {
        headers: AUTH_TOKEN,
        data: userdata
    });

    let resbody = await response.json();
    console.log(resbody);

    console.log(response.status());
    console.log(response.statusText());

    expect(response.status()).toBe(201);

})

test.skip('PUT -- update a user details', async({ request })=> {

    // object body
    let userdata = {
    status: "inactive"
    }


    // JS object to JSON -> Serialization
    let response = await request.put('https://gorest.co.in/public/v2/users/8614320', {
        headers: AUTH_TOKEN,
        data: userdata
    });

    let resbody = await response.json();
    console.log(resbody);

    console.log(response.status());
    console.log(response.statusText());

    expect(response.status()).toBe(200);

})

test.skip('DELETE -- delete a user', async({ request })=> {

    // JS object to JSON -> Serialization
    let response = await request.delete('https://gorest.co.in/public/v2/users/8614320', {
        headers: AUTH_TOKEN,
    });

    console.log(response.status());
    console.log(response.statusText());

    expect(response.status()).toBe(204);
    
})