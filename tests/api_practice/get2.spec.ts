import {test,request,expect} from '@playwright/test'
import Ajv from 'ajv'
import Ajv2020 from "ajv/dist/2020";
import productSchema from '../schemas/productsSchema.json'
import {validateSchema} from '../utility/schemaValidator.js'

const baseURL='https://automationexercise.com/api';

//validate the complete schema of the response body not only the first product 
test('Schema validation ', async ({request})=>{
    const response= await request.get(`${baseURL}/productsList`)
    expect(response.status()).toBe(200);
    const responsebody=await response.json();

    //intilize the object 
    //const ajv = new Ajv();
    const ajv = new Ajv2020();
    //compile the schema with ajv
    const validate=  ajv.compile(productSchema);

    // pass the body into validation and store the status
    const valid= validate(responsebody);
    expect (valid, JSON.stringify(validate.errors,null, 2)).toBeTruthy();

    if (!valid){
        console.log(validate.errors)
    }
    expect(valid).toBeTruthy();
})

test('validate schema with utility', async ({request})=>{
    const response= await request.get(`${baseURL}/productsList`)
    expect(response.status()).toBe(200);
    const responsebody=await response.json();

    await validateSchema(productSchema,responsebody)
   // expect(status).tobe(true);
})

//header validation 
 
test('header validation', async ({request})=>{
    const response= await request.get(`${baseURL}/productsList`)
    expect(response.status()).toBe(200);
    const headers=await response.headers(); //all headers
    console.log(headers); 
    expect(headers['content-type']).toContain('text/html; charset=utf-8');
    expect(headers['server']).toBeDefined();
    expect(headers['cf-cache-status']).toBeDefined();

    //single value fetching 
   //const contentType = await response.headerValue('content-type');
    //property headervalue is not availbale on type API response 
})