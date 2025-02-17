import { expect, test, describe } from 'vitest';

import TestingFarmAPI from '../../src/index';

describe('Test Testing Farm DELETE /requests/{request_id}', () => {
  test.todo('safe response', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    const response = await api.cancelRequest(
      'f053796b-452e-4da2-b4e1-26eb2f3e721f',
      { api_key: 'api_key' }
    );
    expect(response).toMatchInlineSnapshot();
  });

  test.todo('unsafe response', async () => {
    const api = new TestingFarmAPI(
      'https://api.dev.testing-farm.io/v0.1',
      'api_key'
    );

    const response = await api.cancelRequest(
      'f053796b-452e-4da2-b4e1-26eb2f3e721f',
      {},
      false
    );
    expect(response).toBeTypeOf('object');
  });

  test('non-existent request_id', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    await expect(
      api.cancelRequest('request_id', { api_key: 'api_key' })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `[Error: {"detail":[{"loc":["path","request_id"],"msg":"value is not a valid uuid","type":"type_error.uuid"}]}]`
    );
  });
});
