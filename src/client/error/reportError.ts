import { getTypedError } from 'src/shared/error/getTypedError';

export function reportError(e: unknown): void {
  const error = getTypedError(e);
  console.error(error);
}
