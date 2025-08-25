import { expect, test, describe } from 'vitest';

import TestingFarmAPI, { Ranch } from '../../src/index';

describe('Test Testing Farm GET /composes/{ranch}', () => {
  test('ranch `public` - response', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    const response = await api.ranchComposes('public');
    expect(response).toBeDefined();
  });

  test('ranch `redhat` - safe response', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    const response = await api.ranchComposes('redhat');
    expect(response).toBeDefined();
  });

  test('ranch `redhat` - unsafe response', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    const response = await api.ranchComposes('redhat', false);
    expect(response).toBeTypeOf('object');
  });

  test('non-existent ranch', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    await expect(api.ranchComposes('my-ranch' as Ranch)).rejects
      .toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "code": "invalid_union",
          "errors": [
            [
              {
                "code": "invalid_value",
                "values": [
                  "public"
                ],
                "path": [],
                "message": "Invalid input: expected \\"public\\""
              }
            ],
            [
              {
                "code": "invalid_value",
                "values": [
                  "redhat"
                ],
                "path": [],
                "message": "Invalid input: expected \\"redhat\\""
              }
            ]
          ],
          "path": [],
          "message": "Invalid input"
        }
      ]]
    `);
  });
});
