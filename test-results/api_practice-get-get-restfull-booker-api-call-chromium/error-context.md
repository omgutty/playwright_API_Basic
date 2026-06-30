# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api_practice\get.spec.ts >> get restfull booker api call
- Location: tests\api_practice\get.spec.ts:5:5

# Error details

```
Error: apiRequestContext.get: unable to get local issuer certificate
Call log:
  - → GET https://restful-booker.herokuapp.com/booking/1
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br

```

# Test source

```ts
  1  | import {test,  expect } from '@playwright/test';
  2  | 
  3  | const baseURL='https://restful-booker.herokuapp.com';
  4  | 
  5  | test('get restfull booker api call',async ({request})=>{
> 6  |     const response= await request.get(`${baseURL}/booking/1`);
     |                                   ^ Error: apiRequestContext.get: unable to get local issuer certificate
  7  |     expect(response.status()).toBe(200);
  8  | 
  9  |     console.log('get booker', response.status());
  10 | 
  11 |     const responsebody = await response.json();
  12 |     expect(responsebody.firstname).toBe('Jim');
  13 |     expect(responsebody.lastname).toBe('Brown');
  14 |     console.log(responsebody);
  15 | 
  16 |     
  17 | 
  18 | 
  19 | 
  20 | })
```