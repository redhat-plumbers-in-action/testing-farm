import { z } from 'zod';

export const urlSchema = z.string().url();

export const requestIdSchema = z.string();

const testObjectSchema = z.object({
  fmf: z
    .object({
      url: urlSchema,
      ref: z.string().min(1).optional(),
      merge_sha: z.string().min(1).optional().nullable(),
      path: z.string().min(1).optional(),
      name: z.string().min(1).optional(),
      settings: z
        .object({
          'recognize-errors': z.boolean(),
        })
        .optional(),
    })
    .optional(),
  sti: z
    .object({
      url: urlSchema,
      ref: z.string().min(1),
      merge_sha: z.string().min(1).optional(),
      playbooks: z.array(z.string().min(1)).optional(),
      extra_variables: z.record(z.string()).optional(),
    })
    .optional()
    .nullable(),
});

const environmentSchema = z.object({
  arch: z.string().min(1),
  os: z
    .object({
      compose: z.string().min(1),
    })
    .optional(),
  pool: z.string().min(1).optional().nullable(),
  variables: z.record(z.string()).optional(),
  secrets: z.record(z.string()).optional(),
  artifacts: z
    .array(
      z.object({
        id: z.string().min(1),
        type: z.string().min(1),
        packages: z.array(z.string().min(1)).optional(),
      })
    )
    .optional(),
  hardware: z
    .object({
      hostname: z.string().min(1),
      disk: z.object({
        size: z.string().min(1),
      }),
    })
    .optional()
    .nullable(),
  settings: z
    .object({
      pipeline: z
        .object({
          skip_guest_setup: z.boolean().optional(),
        })
        .optional()
        .nullable(),
      provisioning: z
        .object({
          post_install_script: z.string().min(1).optional(),
          tags: z.record(z.string()).optional(),
        })
        .optional()
        .nullable(),
    })
    .optional(),
  tmt: z
    .object({
      context: z
        .object({
          distro: z.string().min(1),
          arch: z.string().min(1),
          trigger: z.string().min(1),
        })
        .optional()
        .nullable(),
    })
    .optional(),
  kickstart: z.any().optional(),
});

const notificationSchema = z.object({
  webhook: z
    .object({
      url: urlSchema,
      token: z.string().min(1).optional(),
    })
    .optional(),
});

const settingsSchema = z.object({
  worker: z
    .object({
      image: z.string().min(1).optional(),
    })
    .optional(),
  pipeline: z
    .object({
      timeout: z.number().min(1).optional(),
    })
    .optional(),
});

export const newRequestSchema = z.object({
  api_key: z.string().min(1),
  test: testObjectSchema,
  environments: z.array(environmentSchema).optional(),
  notification: notificationSchema.optional().nullable(),
  settings: settingsSchema.optional().nullable(),
});

export type NewRequest = z.infer<typeof newRequestSchema>;

export const newRequestResponseSchema = z.object({
  id: requestIdSchema,
  created: z.string().datetime(),
});

export type NewRequestResponse = z.infer<typeof newRequestResponseSchema>;

const noteSchema = z.object({
  level: z.string(),
  message: z.string(),
});

export const requestSchema = z.object({
  id: requestIdSchema,
  user_id: z.string(),
  created: z.string(),
  updated: z.string(),
  environments_requested: z.array(
    z.object({
      arch: z.string(),
      artifacts: z.any(),
      hardware: z.any(),
      os: z.object({
        compose: z.string(),
      }),
      pool: z.union([z.string(), z.null()]),
      settings: z.object({
        pipeline: z.any(),
        provisioning: z.any(),
      }),
      tmt: z.object({
        context: z.object({}).nullable(),
      }),
      variables: z.record(z.string()),
    })
  ),
  state: z.string(),
  notes: z.array(noteSchema),
  result: z.object({
    summary: z.union([z.string(), z.null()]),
    overall: z.string(),
    xunit: z.string().nullable(),
  }),
  run: z.object({
    console: z.union([urlSchema, z.null()]),
    stages: z.union([
      z.array(
        z.object({
          name: z.string(),
          notes: z.array(noteSchema),
          result: z.string(),
          log: urlSchema,
        })
      ),
      z.null(),
    ]),
    artifacts: urlSchema,
  }),
  settings: z.any(),
});

export type Request = z.infer<typeof requestSchema>;

// TODO: make
export const cancelRequestResponseSchema = z.object({
  id: requestIdSchema,
  state: z.string(),
  created: z.string(),
  updated: z.string(),
});

export type CancelRequestResponse = z.infer<typeof cancelRequestResponseSchema>;

export const ranchSchema = z.union([z.literal('public'), z.literal('redhat')]);

export type Ranch = z.infer<typeof ranchSchema>;

export const composeSchema = z.object({
  name: z.string(),
});

export type Compose = z.infer<typeof composeSchema>;

export const composesSchema = z.object({
  composes: z.array(composeSchema),
});

export type Composes = z.infer<typeof composesSchema>;

export const aboutSchema = z.object({
  version: z.string(),
  release_notes: z.string(),
});

export type About = z.infer<typeof aboutSchema>;

export const errorResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;
