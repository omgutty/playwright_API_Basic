import {test,  expect } from '@playwright/test';

const baseURL='https://automationexercise.com/api';

test('get all product list',async ({request})=>{
    const response= await request.get(`${baseURL}/productsList`);
    expect(response.status()).toBe(200);
    console.log('get status:', response.status());
    const responsebody = await response.json();
    console.log(responsebody);
    console.log(`response body is ---> `, typeof responsebody);// object 
    //to get the nested object details in category 
    //When you pass it to JSON.stringify(), JavaScript converts it into text:
    /**
     * value    = responsebody
        replacer = null
        space    = 2
     */
    //Every nested level gets indented by 2 spaces.
    console.log(JSON.stringify(responsebody,null,2))
    const responsestring=JSON.stringify(responsebody,null,2);
    console.log(`response body is ---> `,typeof responsestring); //String

    //if we want object back 
    //again we need to parse
    const responseobj=JSON.parse(responsestring)
    console.log(`response body as object--->`,responseobj)

    /**
     * JSON.stringify() → Object → String
       JSON.parse() → String → Object
     */
     
})

test('get the first product by id ', async ({request})=>{
    const response= await request.get(`${baseURL}/productsList`);
    expect(response.status()).toBe(200);
    const responsebody=await response.json();
    console.log(`Response body response code is `, await responsebody.responseCode);
    expect (await responsebody.responseCode).toBe(200);
    
    const firstproduct = await responsebody.products[0];
    console.log(firstproduct);
})