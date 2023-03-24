import { PublicLink } from './link';
import type {
  About,
  Composes,
  NewRequest,
  NewRequestResponse,
  Ranch,
  Request,
} from './schema';
import {
  composesSchema,
  aboutSchema,
  urlSchema,
  ranchSchema,
  newRequestResponseSchema,
  newRequestSchema,
  requestIdSchema,
  requestSchema,
} from './schema';

export type { Ranch, NewRequest, NewRequestResponse, Request, Composes, About };

export default class TestingFarmAPI {
  private readonly link: PublicLink;

  constructor(instance: string) {
    this.link = new PublicLink(urlSchema.parse(instance));
  }

  async newRequest(request: NewRequest): Promise<NewRequestResponse> {
    const data = newRequestSchema.parse(request);
    return this.link.post('requests', newRequestResponseSchema, data);
  }

  async requestDetails(requestId: string): Promise<Request> {
    const data = requestIdSchema.parse(requestId);
    return this.link.get('requests', requestSchema, data);
  }

  async composes(): Promise<Composes> {
    return this.link.get('composes', composesSchema);
  }

  async ranchComposes(ranch: Ranch): Promise<Composes> {
    const requestedRanch = ranchSchema.parse(ranch);
    return this.link.get(`composes/${requestedRanch}`, composesSchema);
  }

  async about(): Promise<About> {
    return this.link.get('about', aboutSchema);
  }
}
