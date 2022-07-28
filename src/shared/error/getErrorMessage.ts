import { getTypedError } from 'src/shared/error/getTypedError';

export function getErrorMessage(e: unknown): string {
  return getTypedError(e).message;
}
