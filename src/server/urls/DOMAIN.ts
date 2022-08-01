import { USING_DEV_DB } from 'src/server/env/USING_DEV_DB';
import { PUBLIC_DNS_DOMAIN } from 'src/shared/urls/PUBLIC_DNS_DOMAIN';

export const DOMAIN = USING_DEV_DB ? 'localhost:3333' : PUBLIC_DNS_DOMAIN;
