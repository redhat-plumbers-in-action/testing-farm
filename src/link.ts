import { URL } from 'url';
import { z, ZodSchema } from 'zod';

import axios, { AxiosRequestConfig } from 'axios';

interface ApiError {
  error: true;
  message: string;
}

function isError(payload: unknown): payload is ApiError {
  // TODO: Make this better by using zod ...
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return payload && typeof payload == 'object' && payload.error;
}

async function performRequest<
  TSchema extends ZodSchema,
  KValues extends z.infer<TSchema>
>(config: AxiosRequestConfig, schema: TSchema): Promise<KValues> {
  try {
    let response = await axios.request({
      ...config,
      headers: {
        Accept: 'application/json',
        ...(config.headers ?? {}),
      },
    });

    if (isError(response.data)) {
      throw new Error(response.data.message);
    }

    return schema.parse(response.data);
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.message);
    } else {
      throw e;
    }
  }
}

/**
 * Responsible for requesting data from the bugzilla instance handling any
 * necessary authentication and error handling that must happen. The chief
 * access is through the `get`, `post` and `put` methods.
 */
export abstract class TestingFarmLink {
  protected readonly instance: URL;

  constructor(instance: string) {
    this.instance = new URL(instance);
  }

  protected abstract request<
    TSchema extends ZodSchema,
    KValues extends z.infer<TSchema>
  >(config: AxiosRequestConfig, schema: TSchema): Promise<KValues>;

  protected buildURL(path: string): URL {
    let url = new URL(`${this.instance.pathname}/${path}`, this.instance);
    return url;
  }

  async get<TSchema extends ZodSchema, KValues extends z.infer<TSchema>, D>(
    path: string,
    schema: TSchema,
    data?: D
  ): Promise<KValues> {
    const config: AxiosRequestConfig<D> = {
      url: this.buildURL(path).toString(),
      method: 'GET',
    };

    if (data) {
      config.data = data;
      config.headers = {
        'Content-Type': 'application/json',
      };
    }

    return this.request(config, schema);
  }

  async post<R, TSchema extends ZodSchema, KValues extends z.infer<TSchema>>(
    path: string,
    schema: TSchema,
    data: R
  ): Promise<KValues> {
    return this.request(
      {
        url: this.buildURL(path).toString(),
        method: 'POST',
        data: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
      schema
    );
  }
}

export class PublicLink extends TestingFarmLink {
  protected async request<
    TSchema extends ZodSchema,
    KValues extends z.infer<TSchema>
  >(config: AxiosRequestConfig, schema: TSchema): Promise<KValues> {
    return performRequest(config, schema);
  }
}

// TODO ...
// /**
//  * Handles authentication using an API key.
//  */
// export class ApiKeyLink extends TestingFarmLink {
//   constructor(instance: string, private readonly apiKey: string) {
//     super(instance);
//   }

//   protected async request<T>(
//     config: AxiosRequestConfig,
//     validator: Validator<T>
//   ): Promise<T> {
//     return performRequest(config, validator);
//   }
// }
