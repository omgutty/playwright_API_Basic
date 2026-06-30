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
   
    //verifying the status code of the response 
    expect(response.status()).toBe(200);
    //fetching the response body 
    const responsebody=await response.json();
    //verifying the response body is grater than one record
    expect(responsebody.products.length).toBeGreaterThan(0);
    //printing the response status which is present in the response with key value 
    console.log(`Response body response code is `, await responsebody.responseCode);
    //verifying the response code which is present in the body 
    expect (await responsebody.responseCode).toBe(200);
    
    //fetching the product 1 with array, as response is in array with [0]
    const firstproduct = await responsebody.products[0];
    //printing the first product 
    console.log(firstproduct); //it prints in on line if any nested object
    //verifying the property key in response 
    expect(firstproduct).toHaveProperty('id');
    expect(firstproduct).toHaveProperty('name');
    expect(firstproduct).toHaveProperty('price');
    expect(firstproduct).toHaveProperty('brand');
    expect(firstproduct).toHaveProperty('category');
    
    expect(responsebody.products[0].category).toBeDefined();

    //category is nested object which is printing in one line.
    //so using stringfy 
    // this print the nested object with another object with space 
    const firstproductString=JSON.stringify(firstproduct, null,2)
    console.log(firstproductString); 
    const firstproductjson= JSON.parse(firstproductString)
    console.log(firstproductjson);
    
})

//validating the structure 
test('validating the struture of the response', async ({request})=>{
    const response= await request.get(`${baseURL}/productsList`);
    const responsebody=await response.json();
    //print the complete body 
    //console.log(responsebody)
    //printing the first record in the body 
    const firstproductbody=await responsebody.products[0]
    //print the first product body
    console.log(firstproductbody)
    //validating the schema of the first product 
    //expect(await responsebody.product[0]).toEqual(
    expect(firstproductbody).toEqual(  
        expect.objectContaining({
            id:expect.any(Number),
            name:expect.any(String),
            price:expect.any(String),
            category:expect.any(Object)
        })
    )
})

//how to validate the category object, category object have another object which is usertype 

test('validating the structure of the response including the nested objects', async ({request})=>{
    const response = await request.get(`${baseURL}/productsList`)
    const responsebody=await response.json()
    const responsefirstproduct=responsebody.products[0]
    const responsebodyobj=  responsefirstproduct.category;
    console.log(JSON. stringify( responsebodyobj,null, 2));

    //only verifying the nested object 
    expect(responsebodyobj).toEqual(
        expect.objectContaining({
            usertype:expect.any(Object),
            category:expect.any(String)
        })
    )

    //complete response verifying 
    expect(responsefirstproduct).toEqual(
    expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(String),
        brand: expect.any(String),

        category: expect.objectContaining({
            usertype: expect.any(Object),
            category: expect.any(String)
        })
    })
);
})


//both the above tests verified 

//Json.stringfy with out null, pass the value, object, array. 
//validate the complete schema of the response body not only the first product 
