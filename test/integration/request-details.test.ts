import { expect, test, describe } from 'vitest';

import TestingFarmAPI from '../../src/index';

describe('Test Testing Farm GET /requests/{request_id}', () => {
  test('safe response', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    const response = await api.requestDetails(
      'f053796b-452e-4da2-b4e1-26eb2f3e721f'
    );
    expect(response).toMatchInlineSnapshot(`
      {
        "created": "2023-03-22 13:34:50.975382",
        "environments_requested": [
          {
            "arch": "x86_64",
            "artifacts": null,
            "hardware": null,
            "os": {
              "compose": "Fedora-latest",
            },
            "pool": null,
            "settings": {
              "pipeline": null,
              "provisioning": null,
            },
            "tmt": {
              "context": {},
            },
            "variables": {
              "OS": "fedora",
              "PR_NUMBER": "241",
              "REPO_NAME": "sclorg/nginx-container",
              "REPO_URL": "https://github.com/sclorg/nginx-container",
              "SINGLE_VERSION": "1.22",
              "TEST_NAME": "test",
            },
          },
        ],
        "id": "f053796b-452e-4da2-b4e1-26eb2f3e721f",
        "notes": [
          {
            "level": "info",
            "message": "tf-tmt/dispatch-1679492091-a5e7ba84",
          },
        ],
        "result": {
          "overall": "failed",
          "summary": null,
          "xunit": null,
        },
        "run": {
          "artifacts": "https://artifacts.dev.testing-farm.io/f053796b-452e-4da2-b4e1-26eb2f3e721f",
          "console": null,
          "stages": null,
        },
        "settings": null,
        "state": "complete",
        "updated": "2023-03-22 13:34:50.975394",
        "user_id": "d690baff-bfb0-4c30-a315-e71f9daa7de6",
      }
    `);
  });

  test('unsafe response', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    const response = await api.requestDetails(
      'f053796b-452e-4da2-b4e1-26eb2f3e721f',
      false
    );
    expect(response).toBeTypeOf('object');
  });

  test('non-existent request_id', async () => {
    const api = new TestingFarmAPI('https://api.dev.testing-farm.io/v0.1');

    await expect(
      api.requestDetails('request_id')
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"{\\"code\\":404,\\"message\\":\\"No such entity\\"}"'
    );
  });
});
