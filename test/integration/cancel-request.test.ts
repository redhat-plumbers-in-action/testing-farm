import { expect, test, describe } from 'vitest';

import TestingFarmAPI from '../../src/index';

describe('Test Testing Farm DELETE /requests/{request_id}', () => {
  test.todo('safe response', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    const response = await api.cancelRequest(
      'f053796b-452e-4da2-b4e1-26eb2f3e721f'
    );
    expect(response).toMatchInlineSnapshot();
  });

  test.todo('unsafe response', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    const response = await api.cancelRequest(
      'f053796b-452e-4da2-b4e1-26eb2f3e721f',
      false
    );
    expect(response).toBeTypeOf('object');
  });

  test('non-existent request_id', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    await expect(
      api.cancelRequest('request_id')
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `[Error: {"detail":[{"loc":["body"],"msg":"field required","type":"value_error.missing"}]}]`
    );
  });
});
