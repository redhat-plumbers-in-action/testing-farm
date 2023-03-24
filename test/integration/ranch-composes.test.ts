import { expect, test, describe } from 'vitest';

import TestingFarmAPI, { Ranch } from '../../src/index';

describe('Test Testing Farm GET /composes/{ranch}', () => {
  test('ranch `public` - response', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    const response = await api.ranchComposes('public');
    expect(response).toBeDefined();
  });

  test('ranch `redhat` - response', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    const response = await api.ranchComposes('redhat');
    expect(response).toBeDefined();
  });

  test('non-existent ranch', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    await expect(api.ranchComposes('my-ranch' as Ranch)).rejects
      .toThrowErrorMatchingInlineSnapshot(`
      "[
        {
          \\"code\\": \\"invalid_union\\",
          \\"unionErrors\\": [
            {
              \\"issues\\": [
                {
                  \\"received\\": \\"my-ranch\\",
                  \\"code\\": \\"invalid_literal\\",
                  \\"expected\\": \\"public\\",
                  \\"path\\": [],
                  \\"message\\": \\"Invalid literal value, expected \\\\\\"public\\\\\\"\\"
                }
              ],
              \\"name\\": \\"ZodError\\"
            },
            {
              \\"issues\\": [
                {
                  \\"received\\": \\"my-ranch\\",
                  \\"code\\": \\"invalid_literal\\",
                  \\"expected\\": \\"redhat\\",
                  \\"path\\": [],
                  \\"message\\": \\"Invalid literal value, expected \\\\\\"redhat\\\\\\"\\"
                }
              ],
              \\"name\\": \\"ZodError\\"
            }
          ],
          \\"path\\": [],
          \\"message\\": \\"Invalid input\\"
        }
      ]"
    `);
  });
});
