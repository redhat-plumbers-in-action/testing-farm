import { expect, test, describe } from 'vitest';

import TestingFarmAPI from '../../src/index';

describe('Test Testing Farm GET /requests/{request_id}', () => {
  test('response', async () => {
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
          "xunit": "<testsuites overall-result=\\"failed\\"><properties><property name=\\"baseosci.overall-result\\" value=\\"failed\\"/></properties><testsuite name=\\"Fedora-latest:x86_64:/plans/fedora/test-ci\\" result=\\"failed\\" tests=\\"1\\"><logs><log guest-setup-stage=\\"pre_artifact_installation\\" href=\\"https://artifacts.dev.testing-farm.io/f053796b-452e-4da2-b4e1-26eb2f3e721f/guest-setup-36e128c7-b41e-4305-9eea-a2dd03aa37f3/guest-setup-output-pre-artifact-installation.txt\\" name=\\"guest setup\\" schedule-stage=\\"guest-setup\\"/><log guest-setup-stage=\\"post_artifact_installation\\" href=\\"https://artifacts.dev.testing-farm.io/f053796b-452e-4da2-b4e1-26eb2f3e721f/guest-setup-36e128c7-b41e-4305-9eea-a2dd03aa37f3/guest-setup-output-post-artifact-installation.txt\\" name=\\"guest setup\\" schedule-stage=\\"guest-setup\\"/><log href=\\"https://artifacts.dev.testing-farm.io/f053796b-452e-4da2-b4e1-26eb2f3e721f/work-test-cis0alzm7h/tmt-reproducer.sh\\" name=\\"tmt-reproducer\\"/><log href=\\"https://artifacts.dev.testing-farm.io/f053796b-452e-4da2-b4e1-26eb2f3e721f/work-test-cis0alzm7h\\" name=\\"workdir\\"/></logs><properties><property name=\\"baseosci.result\\" value=\\"failed\\"/></properties><testcase name=\\"/fedora, container: sclorg/nginx-container, version: 1.22\\" result=\\"error\\"><properties><property name=\\"baseosci.arch\\" value=\\"x86_64\\"/><property name=\\"baseosci.connectable_host\\" value=\\"3.128.181.10\\"/><property name=\\"baseosci.distro\\" value=\\"Fedora-latest\\"/><property name=\\"baseosci.status\\" value=\\"Complete\\"/><property name=\\"baseosci.testcase.source.url\\" value=\\"\\"/><property name=\\"baseosci.variant\\" value=\\"\\"/></properties><logs><log href=\\"https://artifacts.dev.testing-farm.io/f053796b-452e-4da2-b4e1-26eb2f3e721f/work-test-cis0alzm7h/plans/fedora/test-ci/execute/data/fedora,%20container:%20sclorg/nginx-container,%20version:%201.22\\" name=\\"log_dir\\" schedule-entry=\\"Fedora-latest:x86_64:/plans/fedora/test-ci\\" schedule-stage=\\"running\\"/><log href=\\"https://artifacts.dev.testing-farm.io/f053796b-452e-4da2-b4e1-26eb2f3e721f/work-test-cis0alzm7h/plans/fedora/test-ci/execute/data/fedora,%20container:%20sclorg/nginx-container,%20version:%201.22/output.txt\\" name=\\"testout.log\\" schedule-entry=\\"Fedora-latest:x86_64:/plans/fedora/test-ci\\" schedule-stage=\\"running\\"/></logs><error/><testing-environment name=\\"requested\\"><property name=\\"arch\\" value=\\"x86_64\\"/><property name=\\"compose\\" value=\\"Fedora-latest\\"/><property name=\\"snapshots\\" value=\\"False\\"/></testing-environment><testing-environment name=\\"provisioned\\"><property name=\\"arch\\" value=\\"x86_64\\"/><property name=\\"compose\\" value=\\"Fedora-latest\\"/><property name=\\"snapshots\\" value=\\"False\\"/></testing-environment></testcase></testsuite></testsuites>",
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
});
