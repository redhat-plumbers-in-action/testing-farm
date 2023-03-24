import { z } from 'zod';

export const urlSchema = z.string().url();

export const requestIdSchema = z.string();

const testObjectSchema = z.object({
  fmf: z
    .object({
      url: urlSchema,
      ref: z.string().min(1).optional(),
      merge_sha: z.string().min(1).optional(),
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
      extra_variables: z
        .object({
          // [key: string]: string;
        })
        .optional(),
    })
    .optional(),
});

const environmentSchema = z.object({
  arch: z.string().min(1),
  os: z
    .object({
      compose: z.string().min(1),
    })
    .optional(),
  pool: z.string().min(1).optional(),
  variables: z
    .object({
      // [key: string]: string;
    })
    .optional(),
  secrets: z
    .object({
      // [key: string]: string;
    })
    .optional(),
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
    .optional(),
  settings: z
    .object({
      pipeline: z
        .object({
          skip_guest_setup: z.boolean().optional(),
        })
        .optional(),
      provisioning: z
        .object({
          post_install_script: z.string().min(1).optional(),
          tags: z
            .object({
              // [key: string]: string;
            })
            .optional(),
        })
        .optional(),
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
        .optional(),
    })
    .optional(),
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
  notification: notificationSchema.optional(),
  settings: settingsSchema.optional(),
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
  created: z.string(),
  updated: z.string(),
  environments: z.array(
    z.object({
      arch: z.string(),
      os: z.object({
        compose: z.string(),
      }),
      pool: z.string(),
      variables: z.object({
        // [key: string]: string
      }),
    })
  ),
  state: z.string(),
  notes: z.array(noteSchema),
  result: z.object({
    summary: z.string(),
    overall: z.string(),
    xunit: z.string(),
  }),
  run: z.object({
    console: urlSchema,
    stages: z.array(
      z.object({
        name: z.string(),
        notes: z.array(noteSchema),
        result: z.string(),
        log: urlSchema,
      })
    ),
    artifacts: urlSchema,
  }),
});

export type Request = z.infer<typeof requestSchema>;

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
  api_version: z.string(),
});

export type About = z.infer<typeof aboutSchema>;
