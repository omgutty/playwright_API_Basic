import { test, expect, APIRequestContext } from '@playwright/test';

test('api testing generate token', async ({ request }: { request: APIRequestContext }) => {
  const response = await request.post('https://simple-tool-rental-api.click/api-clients', {
    data: {
      clientName: "Postman on Valentin's computer",
      clientEmail: `student-${Date.now()}@example.com`,
    },
  });

  console.log('status:', response.status());
  const responseBody = await response.json();
  console.log(responseBody);

  expect(response.status()).toBe(201);
  expect(responseBody.accessToken).toBeTruthy();
});
