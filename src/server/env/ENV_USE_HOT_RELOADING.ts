import { envGet } from 'src/shared/env';

export const ENV_USE_HOT_RELOADING =
  envGet('HOT_RELOAD', { defaultValue: 'False' }) === 'True';
