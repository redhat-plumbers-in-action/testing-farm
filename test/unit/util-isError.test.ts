import { expect, test, describe } from 'vitest';

import { isError } from '../../src/util';

describe('Test isError()', () => {
  test('error response', () => {
    const result = isError({
      code: 0,
      message: 'string',
    });

    expect(result).toBeDefined();
    expect(result).toBe(true);
  });

  test('non-error response', () => {
    const result = isError({
      api_key: '692f43c8636b1f1e2ab04c9881b4ab4e68088c9e',
      test: {
        fmf: {
          url: 'https://github.com/psss/fmf',
          ref: 'f31',
          merge_sha: '0bbee7fb78d20e1e3b0e3ccc6958074b07d9c91c',
          path: '/examples/wget',
          name: 'example-plan',
          settings: {
            'recognize-errors': true,
          },
        },
        sti: {
          url: 'https://src.osci.redhat.com/rpms/cpio',
          ref: 'f31',
          merge_sha: '0bbee7fb78d20e1e3b0e3ccc6958074b07d9c91c',
          playbooks: ['tests/tests*.yml'],
          extra_variables: {
            foo: 'some-foo-value',
            boo: 'some-boo-value',
          },
        },
      },
      environments: [
        {
          arch: 'x86_64',
          os: {
            compose: 'Fedora-Rawhide',
          },
          pool: 'aws-pool-01',
          variables: {
            FOO: 'some-value',
            BOO: 'other-value',
          },
          secrets: {
            FOO: 'some-value',
            BOO: 'other-value',
          },
          artifacts: [
            {
              id: 43054146,
              type: 'fedora-copr-build',
              packages: ['openssh'],
            },
          ],
          hardware: {
            hostname: 'my.machine.com',
            disk: {
              size: '>=100GB',
            },
          },
          settings: {
            pipeline: {
              skip_guest_setup: true,
            },
            provisioning: {
              post_install_script:
                "#!/bin/sh\nsudo sed -i 's/.*ssh-rsa/ssh-rsa/' /root/.ssh/authorized_keys\n",
              tags: {
                BusinessUnit: 'sst_cs_apps_rhel',
              },
            },
          },
          tmt: {
            context: {
              distro: 'fedora-33',
              arch: 'x86_64',
              trigger: 'code',
            },
          },
        },
      ],
      notification: {
        webhook: {
          url: 'string',
          token: 'string',
        },
      },
      settings: {
        worker: {
          image: 'quay.io/testing-farm/worker:1.0',
        },
        pipeline: {
          timeout: 720,
        },
      },
    });

    expect(result).toBeDefined();
    expect(result).toBe(false);
  });
});
