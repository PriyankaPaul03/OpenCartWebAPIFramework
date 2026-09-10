import { test, expect } from "../../src/fixtures/apifixtures";

const TOKEN ='3b963bdbfc9c6b6dc04929f98dc7c108d72594feba64a3a3e550422f900b12ee';
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };
let userID: number; 


test.describe.serial('running e2e go rest crud api test', () => {

test('GET API --- get all the user', async ({apiHelper}) => {

    let response = await apiHelper.get('/public/v2/users/', AUTH_HEADER);
    expect(response.status).toBe(200);
   // expect(response.body.length).toBeGreaterThan(0);
});


test('POST API --- create a user', async ({ apiHelper }) => {

    let userdata = {
    name: "Naveen API Automation",
    email: `naveen_${Date.now()}@gmail.com`, // unique
    gender: "female",
    status: "active"
    };

    let response = await apiHelper.post('/public/v2/users', userdata, AUTH_HEADER);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(userdata.name);
    userID = response.body.id;
    console.log('Created User ID: '+ userID);

});

test('PUT API --- updated a user', async ({ apiHelper }) => {

    let userUpdatedData = {
    name: "Naveen API Automation Updated",
    status: "inactive"
    };

    let response = await apiHelper.put(`/public/v2/users/${userID}`, userUpdatedData, AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(userUpdatedData.name);
    expect(response.body.status).toBe(userUpdatedData.status);

});


test('DELETE API --- delete a user', async ({ apiHelper }) => {

    let response = await apiHelper.delete(`/public/v2/users/${userID}`, AUTH_HEADER);
    expect(response.status).toBe(204);
});

});