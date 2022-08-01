import { USING_DEV_DB } from 'src/server/env/USING_DEV_DB';

export const PROTOCOL = USING_DEV_DB ? 'http://' : 'https://';
