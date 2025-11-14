import { expect, test, describe } from 'vitest';

import TestingFarmAPI from '../../src/index';

describe('Test Testing Farm GET /whoami', () => {
  test('safe response', async () => {
    const api = new TestingFarmAPI(
      'https://api.dev.testing-farm.io/v0.1',
      'test-api-key'
    );

    await expect(api.whoami()).rejects.toThrowErrorMatchingInlineSnapshot(
      `[Error: {"message":"Not authorized to perform this action"}]`
    );
  });

  test('unsafe response', async () => {
    const api = new TestingFarmAPI(
      'https://api.dev.testing-farm.io/v0.1',
      'test-api-key'
    );

    await expect(api.whoami(false)).rejects.toThrowErrorMatchingInlineSnapshot(
      `[Error: {"message":"Not authorized to perform this action"}]`
    );
  });
});
