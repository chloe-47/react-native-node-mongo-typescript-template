import { envGet } from 'src/shared/env';

export default function environmentIsUsingHotReloading(): boolean {
  return envGet('HOT_RELOAD', { defaultValue: 'False' }) === 'True';
}
