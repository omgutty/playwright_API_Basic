# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api_practice\post.spec.ts >> post auth
- Location: tests\api_practice\post.spec.ts:5:5

# Error details

```
Error: apiRequestContext.post: unable to get local issuer certificate
Call log:
  - → POST https://restful-booker.herokuapp.com/auth
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json
    - content-length: 45

```

# Test source

```ts
  1  | import {test,expect,request, APIRequestContext} from '@playwright/test'
  2  | 
  3  | const baseURL='https://restful-booker.herokuapp.com';
  4  | 
  5  | test('post auth', async ({request}:{request:APIRequestContext})=>{
> 6  |     const response= await request.post(`${baseURL}/auth`, {
     |                                   ^ Error: apiRequestContext.post: unable to get local issuer certificate
  7  |         headers:{
  8  |             'Content-Type':'application/json'
  9  |         },
  10 |         data:{
  11 |             'username':'admin',
  12 |             'password':'password123'
  13 |         }
  14 |     });
  15 |     const responsebody= response.json();
  16 |         
  17 |      
  18 |      expect(response).toBe(200);
  19 |     console.log(responsebody);
  20 | })
  21 | 
```