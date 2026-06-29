# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\get-tool.spec.ts >> get tool by id
- Location: tests\api\get-tool.spec.ts:5:5

# Error details

```
Error: apiRequestContext.get: unable to get local issuer certificate
Call log:
  - → GET https://simple-tool-rental-api.click/tools/4643
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br

```

# Test source

```ts
  1  | ﻿import { test, expect, APIRequestContext } from '@playwright/test';
  2  | 
  3  | const baseUrl = 'https://simple-tool-rental-api.click';
  4  | 
  5  | test('get tool by id', async ({ request }: { request: APIRequestContext }) => {
> 6  |   const response = await request.get(`${baseUrl}/tools/4643`);
     |                                  ^ Error: apiRequestContext.get: unable to get local issuer certificate
  7  | 
  8  |   console.log('get tool status:', response.status());
  9  |   const responseBody = await response.json();
  10 |   console.log(responseBody);
  11 | 
  12 |   expect(response.status()).toBe(200);
  13 |   expect(responseBody.id).toBe(4643);
  14 | });
  15 | 
```