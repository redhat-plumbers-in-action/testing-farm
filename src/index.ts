// import type {} from './schema';

import { PublicLink } from './link';
import { urlSchema } from './schema';

export type {} from './schema';

export default class TestingFarmAPI {
  private readonly link: PublicLink;

  constructor(instance: string) {
    this.link = new PublicLink(urlSchema.parse(instance));
  }

  //   newRequest(data: NewRequest): Promise<Request> {
  //     return this.link.post('requests', data);
  //   }

  //   requestDetails(requestId: string): Promise<Request> {
  //     return this.link.get('requests', requestId);
  //   }

  //   composes(): Promise<Compose[]> {
  //     return this.link.get('composes');
  //   }

  //   ranchComposes(ranch: unknown): Promise<Compose[]> {
  //     return this.link.get('composes', data);
  //   }

  //   about(): Promise<About> {
  //     return this.link.get('about');
  //   }
}
