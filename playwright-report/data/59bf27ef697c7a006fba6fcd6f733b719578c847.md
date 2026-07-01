# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api_practice\post.spec.ts >> Creates a new booking in the API
- Location: tests\api_practice\post.spec.ts:32:5

# Error details

```
Error: apiRequestContext.post: unable to get local issuer certificate
Call log:
  - → POST https://restful-booker.herokuapp.com/booking
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json
    - content-length: 168

```

# Test source

```ts
  1  | import {test,expect,request, APIRequestContext} from '@playwright/test'
  2  | 
  3  | const baseURL='https://restful-booker.herokuapp.com';
  4  | 
  5  | 
  6  | 
  7  | test('post auth', async ({request}:{request:APIRequestContext})=>{
  8  |     const response= await request.post(`${baseURL}/auth`, {
  9  |         headers:{
  10 |             'Content-Type':'application/json'
  11 |         },
  12 |         data:{
  13 |             'username':'admin',
  14 |             'password':'password123'
  15 |         }
  16 |     });
  17 |     const responsebody= await response.json();
  18 |         
  19 |      
  20 |      expect( response.status()).toBe(200);
  21 |      await expect(response).toBeOK();
  22 |     console.log(responsebody);
  23 |     const token = responsebody.token;
  24 |     expect(token).toBeDefined();
  25 |     expect(token).toEqual(expect.any(String));
  26 |     console.log(token);
  27 | 
  28 |     
  29 | })
  30 | 
  31 | 
  32 | test(`Creates a new booking in the API`, async({request})=>{
> 33 |     const response= await request.post(`${baseURL}/booking`,{
     |                                   ^ Error: apiRequestContext.post: unable to get local issuer certificate
  34 |         headers:{
  35 |             'Content-Type':'application/json'
  36 |         },
  37 |         data:{
  38 |             'firstname':'Om',
  39 |             'lastname':'Gutty',
  40 |             "totalprice" : 111,
  41 |              "depositpaid" : true,
  42 |             "bookingdates" : {
  43 |                     "checkin" : "20126-01-01",
  44 |                     "checkout" : "2027-01-01"
  45 |             },
  46 |             "additionalneeds" : "Breakfast"
  47 |         }
  48 |     });
  49 |     const responsebody= await response.json();
  50 |     expect(response.status()).toBe(200);
  51 |     const bookingid= responsebody.bookingid;
  52 |     expect(responsebody.bookingid).toBeDefined();
  53 |     console.log(bookingid);
  54 | 
  55 | })
```