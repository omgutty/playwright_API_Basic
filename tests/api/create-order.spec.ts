import { test, expect, APIRequestContext } from '@playwright/test';
import { generateAccessToken } from './access-token';

const baseUrl = 'https://simple-tool-rental-api.click';

test('create order', async ({ request }: { request: APIRequestContext }) => {
  const accessToken = await generateAccessToken(request);

  const response = await request.post(`${baseUrl}/orders`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      toolId: 4643,
      customerName: 'Priyanka',
    },
  });

  console.log('create order status:', response.status());
  const responseBody = await response.json();
  console.log(responseBody);

  expect(response.status()).toBe(201);
  expect(responseBody.orderId).toBeTruthy();
});
