import { expect, test, describe } from 'vitest';

import TestingFarmAPI from '../../src/index';

describe('Test Testing Farm GET /about', () => {
  test('safe response', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    const response = await api.about();
    expect(response).toBeDefined();
  });

  test('unsafe response', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    const response = await api.about(false);
    expect(response).toBeTypeOf('object');
  });

  test('error', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.0');

    await expect(api.about()).rejects.toThrowErrorMatchingInlineSnapshot(
      `[Error: {"detail":"Not Found"}]`
    );
  });
});
