import mongoose from 'mongoose';
import { MONGODB_DB_NAME } from 'src/server/env/MONGODB_DB_NAME';
import { envGet } from 'src/shared/env';

// Go to the MongoDB Atlas website and look at your database cluster. Click
// on the cluster name and then click on the "Connect" button. Click "Connect your application."
// This will show a string like:
// "mongodb+srv://user0:<password>@cluster0.<MONGODB_SUBDOMAIN>.mongodb.net/?retryWrites=true&w=majority"
// Copy the subdomain and password into environment variables (in the .env file) with the following names.
const MONGODB_SUBDOMAIN = envGet('MONGODB_SUBDOMAIN', {
  throwIfNotFound: true,
});

const PASSWORD = envGet('MONGODB_PASSWORD', { throwIfNotFound: true });

const CLUSTER = 'Cluster0';
const DB_USER_NAME = 'user0';

export const MONGO_DB_URI =
  'mongodb+srv://' +
  DB_USER_NAME +
  ':' +
  PASSWORD +
  '@' +
  CLUSTER +
  '.' +
  MONGODB_SUBDOMAIN +
  '.mongodb.net/' +
  MONGODB_DB_NAME +
  '?retryWrites=true&w=majority';

export function initMongoClient(): void {
  mongoose.connect(MONGO_DB_URI);
}
