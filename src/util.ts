import { errorResponseSchema } from './schema';

export function isError(response: unknown): boolean {
  return errorResponseSchema.safeParse(response).success;
}
