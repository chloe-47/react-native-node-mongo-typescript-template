import { USING_DEV_DB } from 'src/server/env/USING_DEV_DB';

export default function getDomain(): string {
  if (USING_DEV_DB) {
    return 'http://';
  } else {
    return 'https://';
  }
}
