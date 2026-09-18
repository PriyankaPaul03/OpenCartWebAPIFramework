import { test, expect } from "../../src/fixtures/apifixtures";

const TOKEN = process.env.API_TOKEN!;;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

let userID: number; 


test.describe.serial('running e2e go rest crud api test', () => {

    //GET test:
    test('@regression GET API -- get all users', async ({ apiHelper }) => {
        let response = await apiHelper.get('/public/v2/users', AUTH_HEADER);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });


    test('@regression POST API -- create a user', async ({ apiHelper }) => {

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

    test('@regression PUT API -- Update a user', async ({ apiHelper }) => {

        let userUpdatedData = {
        name: "Naveen API Automation Updated",
        status: "inactive"
        };

        let response = await apiHelper.put(`/public/v2/users/${userID}`, userUpdatedData, AUTH_HEADER);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(userUpdatedData.name);
        expect(response.body.status).toBe(userUpdatedData.status);

    });

    test('@regression DELETE API -- Delete a user', async ({ apiHelper }) => {

        let response = await apiHelper.delete(`/public/v2/users/${userID}`, AUTH_HEADER);
        expect(response.status).toBe(204);
    });

});