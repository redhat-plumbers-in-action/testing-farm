import axios, { AxiosRequestConfig } from 'axios';
import { URL } from 'url';

async function performRequest(config: AxiosRequestConfig): Promise<unknown> {
  try {
    let response = await axios.request({
      ...config,
      headers: {
        Accept: 'application/json',
        ...(config.headers ?? {}),
      },
    });

    return response.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw new Error(JSON.stringify(e.response?.data));
    } else {
      throw e;
    }
  }
}

export abstract class TestingFarmLink {
  protected readonly instance: URL;

  constructor(instance: string) {
    this.instance = new URL(instance);
  }

  protected abstract request(config: AxiosRequestConfig): Promise<unknown>;

  protected buildURL(path: string): URL;
  protected buildURL<P extends Record<string, string>>(
    path: string,
    searchParams: P
  ): URL;
  protected buildURL<P extends Record<string, string>>(
    path: string,
    searchParams?: P
  ): URL {
    let url = new URL(`${this.instance.pathname}/${path}`, this.instance);

    if (searchParams) {
      url.search = new URLSearchParams(searchParams).toString();
    }

    return url;
  }

  async get(path: string): Promise<unknown> {
    const config: AxiosRequestConfig = {
      url: this.buildURL(path).toString(),
      method: 'GET',
    };

    return this.request(config);
  }

  async post<D>(path: string, data: D): Promise<unknown> {
    const config: AxiosRequestConfig<D> = {
      url: this.buildURL(path).toString(),
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this.request(config);
  }

  async delete(path: string): Promise<unknown> {
    const config: AxiosRequestConfig = {
      url: this.buildURL(path).toString(),
      method: 'DELETE',
    };

    return this.request(config);
  }
}

export class PublicLink extends TestingFarmLink {
  protected async request(config: AxiosRequestConfig): Promise<unknown> {
    return performRequest(config);
  }
}
