import { test, expect, APIRequestContext } from '@playwright/test';

const baseUrl = 'https://simple-tool-rental-api.click';

test('get tool by id', async ({ request }: { request: APIRequestContext }) => {
  const response = await request.get(`${baseUrl}/tools/4643`);

  console.log('get tool status:', response.status());
  const responseBody = await response.json();
  console.log(responseBody);

  expect(response.status()).toBe(200);
  expect(responseBody.id).toBe(4643);
});
