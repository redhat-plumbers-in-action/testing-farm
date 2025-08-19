import { describe, test, expect } from 'vitest';

import { newRequestSchema } from '../../src/schema';

describe('Schema validation', () => {
  describe('environment schema', () => {
    test('should allow os field to be null', () => {
      const validRequest = {
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
      };

      const result = newRequestSchema.safeParse(validRequest);
      expect(result.success).toBe(true);
    });

    test('should allow os field to be undefined', () => {
      const validRequest = {
        test: {
          fmf: {
            url: 'https://github.com/example/repo',
          },
        },
        environments: [
          {
            arch: 'x86_64',
          },
        ],
      };

      const result = newRequestSchema.safeParse(validRequest);
      expect(result.success).toBe(true);
    });

    test('should allow os field to be an object', () => {
      const validRequest = {
        test: {
          fmf: {
            url: 'https://github.com/example/repo',
          },
        },
        environments: [
          {
            arch: 'x86_64',
            os: {
              compose: 'Fedora-latest',
            },
          },
        ],
      };

      const result = newRequestSchema.safeParse(validRequest);
      expect(result.success).toBe(true);
    });

    test('should reject invalid os object', () => {
      const invalidRequest = {
        test: {
          fmf: {
            url: 'https://github.com/example/repo',
          },
        },
        environments: [
          {
            arch: 'x86_64',
            os: {
              compose: '',
            },
          },
        ],
      };

      const result = newRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
    });
  });
});
