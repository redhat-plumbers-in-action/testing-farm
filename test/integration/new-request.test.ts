import { test, describe, expect } from 'vitest';

import TestingFarmAPI from '../../src/index';

describe('Test Testing Farm POST /requests', () => {
  test.todo('safe response', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');
  });

  test.todo('unsafe response', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');
  });

  test('bad request', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    const response = api.newRequest({
      api_key: 'api_key',
      test: {},
    });
    await expect(response).rejects.toThrowErrorMatchingInlineSnapshot(
      `[Error: {"message":"Test section is empty or test type is wrong."}]`
    );
  });
  test('unsafe request', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    const response = api.unsafeNewRequest({
      api_key: 'api_key',
      test: {},
      environments: [
        {
          hardware: '{"something":"foobar"}',
        },
      ],
    });

    await expect(response).rejects.toThrowErrorMatchingInlineSnapshot(
      `[Error: {"message":"Test section is empty or test type is wrong."}]`
    );
  });

  test('request with os null', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    const response = api.newRequest({
      api_key: 'api_key',
      test: {
        fmf: {
          url: 'https://github.com/example/repo',
        },
      },
      environments: [
        {
          arch: 'x86_64',
          os: null,
        },
      ],
    });

    await expect(response).rejects.toThrowErrorMatchingInlineSnapshot(
      `[Error: {"message":"Not authorized to perform this action"}]`
    );
  });
});
