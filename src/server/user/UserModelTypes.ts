import type { ObjectId } from 'mongodb';

export interface UserDocType {
  password: string;
  emailAddress: string;
  displayName: string;
}

declare global {
  namespace Express {
    interface User {
      _id: ObjectId;
      emailAddress: string;
      displayName: string;
      passwordReset?: {
        token: string;
        expiry: Date;
      };
    }
  }
}
