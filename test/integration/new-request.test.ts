import { expect, test, describe } from 'vitest';

import TestingFarmAPI from '../../src/index';

describe('Test Testing Farm POST /requests', () => {
  test.todo('response', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    // const response = await api.newRequest( ... );
    // expect(response).toBeDefined();
  });
});
