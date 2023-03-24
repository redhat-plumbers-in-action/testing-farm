import { expect, test, describe } from 'vitest';

import TestingFarmAPI from '../../src/index';

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
});
