import { test, expect, APIRequestContext } from '@playwright/test';
import { generateAccessToken } from './access-token';

test('api testing generate access token', async ({ request }: { request: APIRequestContext }) => {
  const accessToken = await generateAccessToken(request);

  console.log('access token:', accessToken);
  expect(accessToken).toBeTruthy();
});
