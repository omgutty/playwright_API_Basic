import { APIRequestContext, expect } from '@playwright/test';

const baseUrl = 'https://simple-tool-rental-api.click';

export async function generateAccessToken(request: APIRequestContext) {
  const response = await request.post(`${baseUrl}/api-clients`, {
    data: {
      clientName: "Postman on Valentin's computer",
      clientEmail: `student-${Date.now()}@example.com`,
    },
  });

  expect(response.status()).toBe(201);
  const responseBody = await response.json();
  return responseBody.accessToken;
}
