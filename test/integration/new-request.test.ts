import { expect, test, describe } from 'vitest';

import TestingFarmAPI from '../../src/index';

describe('Test Testing Farm POST /requests', () => {
  test.todo('response', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    // const response = await api.newRequest({
    //   api_key: 'api_key',
    //   test: {},
    // });
    // expect(response).toBeDefined();
  });

  test('bad API key', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    const response = api.newRequest({
      api_key: 'api_key',
      test: {},
    });
    await expect(response).rejects.toThrowErrorMatchingInlineSnapshot(
      '"{\\"errors\\":{\\"test\\":\\"Only one of test type \'fmf\', \'script\' or \'sti\' can be specified in \'test\' field.\\"}}"'
    );
  });
});
