import { getTypedError } from 'src/shared/error/getTypedError';

export default function reportError(e: unknown): void {
  const error = getTypedError(e);
  console.error(error);
}
