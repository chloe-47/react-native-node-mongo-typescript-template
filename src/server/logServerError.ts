import { getTypedError } from 'src/shared/error/getTypedError';

export function logServerError(loggingTag: string, error_: unknown): void {
  const error = getTypedError(error_);
  console.error(`Error [${loggingTag}]`, error);
}
