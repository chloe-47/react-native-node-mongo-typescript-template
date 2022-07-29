import { envGet } from 'src/shared/env';

export const MONGODB_DB_NAME = envGet('MONGODB_DB_NAME', {
  throwIfNotFound: true,
});
