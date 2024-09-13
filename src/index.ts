import { PublicLink } from './link';
import { isError } from './util';
import {
  About,
  Composes,
  NewRequest,
  NewRequestResponse,
  Ranch,
  Request,
  ErrorResponse,
  CancelRequestResponse,
  cancelRequestResponseSchema,
  RequestsFilter,
  CancelRequest,
  cancelRequestSchema,
} from './schema';
import {
  composesSchema,
  aboutSchema,
  ranchSchema,
  newRequestResponseSchema,
  newRequestSchema,
  requestIdSchema,
  requestSchema,
} from './schema';

export type {
  Ranch,
  NewRequest,
  NewRequestResponse,
  Request,
  Composes,
  About,
  ErrorResponse,
};

export {
  isError,
  composesSchema,
  aboutSchema,
  newRequestResponseSchema,
  requestSchema,
  ranchSchema,
  newRequestSchema,
  requestIdSchema,
};

export default class TestingFarmAPI {
  private readonly link: PublicLink;

  constructor(instance: string) {
    this.link = new PublicLink(new URL(instance));
  }

  async requests(filter: RequestsFilter): Promise<Request[]>;
  async requests(filter: RequestsFilter, strict: boolean): Promise<unknown>;
  async requests(filter: RequestsFilter, strict?: boolean): Promise<unknown> {
    if (!this.isStrict(strict)) {
      return this.link.get('requests', filter);
    }

    return requestSchema.array().parse(await this.link.get('requests', filter));
  }

  async newRequest(request: NewRequest): Promise<NewRequestResponse>;
  async newRequest(request: NewRequest, strict: boolean): Promise<unknown>;
  async newRequest(request: NewRequest, strict?: boolean): Promise<unknown> {
    const data = newRequestSchema.parse(request);

    if (!this.isStrict(strict)) {
      return this.link.post('requests', data);
    }

    return newRequestResponseSchema.parse(
      await this.link.post('requests', data)
    );
  }

  async unsafeNewRequest(request: unknown): Promise<unknown> {
    return await this.link.post('requests', request);
  }

  async requestDetails(requestId: string): Promise<Request>;
  async requestDetails(requestId: string, strict: boolean): Promise<unknown>;
  async requestDetails(requestId: string, strict?: boolean): Promise<unknown> {
    const id = requestIdSchema.parse(requestId);

    if (!this.isStrict(strict)) {
      return this.link.get(`requests/${id}`);
    }

    return requestSchema.parse(await this.link.get(`requests/${id}`));
  }

  async cancelRequest(
    requestId: string,
    request: CancelRequest
  ): Promise<CancelRequestResponse>;
  async cancelRequest(
    requestId: string,
    request: CancelRequest,
    strict: boolean
  ): Promise<unknown>;
  async cancelRequest(
    requestId: string,
    request: CancelRequest,
    strict?: boolean
  ): Promise<unknown> {
    const id = requestIdSchema.parse(requestId);
    const data = cancelRequestSchema.parse(request);

    if (!this.isStrict(strict)) {
      return this.link.delete(`requests/${id}`, data);
    }

    return cancelRequestResponseSchema.parse(
      await this.link.delete(`requests/${id}`, data)
    );
  }

  async composes(): Promise<Composes>;
  async composes(strict: boolean): Promise<unknown>;
  async composes(strict?: boolean): Promise<unknown> {
    if (!this.isStrict(strict)) {
      return this.link.get('composes');
    }

    return composesSchema.parse(await this.link.get('composes'));
  }

  async ranchComposes(ranch: Ranch): Promise<Composes>;
  async ranchComposes(ranch: Ranch, strict: boolean): Promise<unknown>;
  async ranchComposes(ranch: Ranch, strict?: boolean): Promise<unknown> {
    const requestedRanch = ranchSchema.parse(ranch);

    if (!this.isStrict(strict)) {
      return this.link.get(`composes/${requestedRanch}`);
    }

    return composesSchema.parse(
      await this.link.get(`composes/${requestedRanch}`)
    );
  }

  async about(): Promise<About>;
  async about(strict: boolean): Promise<unknown>;
  async about(strict?: boolean): Promise<unknown> {
    if (!this.isStrict(strict)) {
      return this.link.get('about');
    }

    return aboutSchema.parse(await this.link.get('about'));
  }

  private isStrict(strict: boolean | undefined) {
    return strict === undefined || strict;
  }
}
