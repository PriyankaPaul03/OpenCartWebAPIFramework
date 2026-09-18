import { test, expect } from "../../src/fixtures/apifixtures";

const TOKEN = process.env.API_TOKEN!;
let AUTH_HEADER = { 
    Authorization: `Bearer ${TOKEN}` 
};


//helper -- generic function -- to create fresh user

async function createUser(apiHelper: any) {
    
    let userdata = {
        name: "Naveen API Automation",
        email: `naveen_${Date.now()}@gmail.com`, // unique
        gender: "female",
        status: "active"
        };
    
    let response = await apiHelper.post('/public/v2/users', userdata, AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body;
    
}

// Test-1: Create a user, create and verify : AAA
// POST -> userid -> Get call -> verify

test('@regression POST -- create user', async({ apiHelper }) => {

    // create a user
    let userResponse = await createUser(apiHelper);

    // get the user
    let response = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(response.status).toBe(200);

})


// Test2: Update a user and verify : AAA
// POST -> userid -> Put call -> get call -> verify

test('@regression PUT -- update a user', async({ apiHelper }) => {

    let userUpdatedData = {
        status: "inactive"
    };

    // create a user
    let userResponse = await createUser(apiHelper);
    console.log('Created userid: ' + userResponse.id);

    // update the user
    let updatedResponse = await apiHelper.put(`/public/v2/users/${userResponse.id}`, userUpdatedData, AUTH_HEADER);
    expect(updatedResponse.status).toBe(200);

    // get the user
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.status).toBe(userUpdatedData.status);

})


// Test3: Delete a user and verify : AAA
// Post -> userid -> Delete call -> get call -> verify

test('@regression DELETE -- delete a user', async({ apiHelper }) => {

    // create a user
    let userResponse = await createUser(apiHelper);
    console.log('Created userid: ' + userResponse.id);

    // delete the user
    let updatedResponse = await apiHelper.delete(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(updatedResponse.status).toBe(204);

    // get the user
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(404);
})

