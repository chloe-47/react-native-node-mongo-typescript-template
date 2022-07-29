import { MONGODB_DB_NAME } from 'src/server/env/MONGODB_DB_NAME';

export const USING_DEV_DB = MONGODB_DB_NAME === 'devdb';
