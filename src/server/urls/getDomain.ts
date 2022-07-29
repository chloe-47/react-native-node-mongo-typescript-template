import { USING_DEV_DB } from 'src/server/env/USING_DEV_DB';
import { PUBLIC_DNS_DOMAIN } from 'src/shared/urls/PUBLIC_DNS_DOMAIN';

export default function getDomain(): string {
  if (USING_DEV_DB) {
    return 'localhost:3333';
  } else {
    return PUBLIC_DNS_DOMAIN;
  }
}
