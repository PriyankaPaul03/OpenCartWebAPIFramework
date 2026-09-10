import { test, expect } from "../../src/fixtures/apifixtures";
import Ajv from 'ajv';

let AUTH_HEADER = { Authorization: `Bearer ${process.env.API_TOKEN}` };
let ajv = new Ajv();

// define json schema
let userSchema = {
    "type": "object",
    "properties": {
        "id": {
        "type": "number"
        },
        "name": {
        "type": "string"
        },
        "email": {
        "type": "string"
        },
        "gender": {
        "type": "string"
        },
        "status": {
        "type": "string"
        }
    },
    "required": [
        "id",
        "name",
        "email",
        "gender",
        "status"
    ]
}   

let userArrayschema = {
    "type": "array",
    "items": userSchema
}

test('POST API --- create a user', async ({ apiHelper }) => {

    let userdata = {
        name: "Schema validation",
        email: `automation_${Date.now()}@gmail.com`,
        gender: "female",
        status: "active"
    };

    // post -- create a user
    let createResponse = await apiHelper.post('/public/v2/users', userdata, AUTH_HEADER);
    expect(createResponse.status).toBe(201);
    let userID = createResponse.body.id;

    // get -- get the 
    let getUserresponse = await apiHelper.get(`/public/v2/users/${userID}`, AUTH_HEADER);
    expect(getUserresponse.status).toBe(200);

    //schema validation
    let schemaValidation = ajv.compile(userSchema);
    let isSchemaValid = schemaValidation(getUserresponse.body);

    if(!isSchemaValid){
        console.log("Schema Error: ", schemaValidation.errors)
    }

    expect(isSchemaValid).toBeTruthy();
})


test('GET API --- validate array user', async ({ apiHelper }) => {


    // get -- get the 
    let getUserresponse = await apiHelper.get('/public/v2/users', AUTH_HEADER);
    expect(getUserresponse.status).toBe(200);

    //schema validation
    let schemaValidation = ajv.compile(userArrayschema);
    let isSchemaValid = schemaValidation(getUserresponse.body);

    if(!isSchemaValid){
        console.log("Schema Error: ", schemaValidation.errors)
    }

    expect(isSchemaValid).toBeTruthy();
})