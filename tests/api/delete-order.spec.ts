import { test, expect, APIRequestContext } from '@playwright/test';
import { generateAccessToken } from './access-token';

const baseUrl = 'https://simple-tool-rental-api.click';

async function createOrder(request: APIRequestContext, accessToken: string) {
  const response = await request.post(`${baseUrl}/orders`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      toolId: 4643,
      customerName: 'Priyanka',
    },
  });

  expect(response.status()).toBe(201);
  const responseBody = await response.json();
  return responseBody.orderId;
}

test('delete order', async ({ request }: { request: APIRequestContext }) => {
  const accessToken = await generateAccessToken(request);
  const orderId = await createOrder(request, accessToken);

  const response = await request.delete(`${baseUrl}/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  console.log('delete status:', response.status());
  expect(response.status()).toBe(204);
});
