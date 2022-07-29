import MongoStore from 'connect-mongo';
import type { Express } from 'express';
import expressSession from 'express-session';
import type { ObjectId } from 'mongodb';
import type {
  HydratedDocument,
  PassportLocalModel,
  PassportLocalSchema,
} from 'mongoose';
import mongoose, { Document, Schema } from 'mongoose';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import { MONGO_DB_URI } from 'src/server/mongo/client';
import type { UserDocType } from 'src/server/user/UserModelTypes';
import { envGet } from 'src/shared/env';

export type UserType = Document<string, unknown, UserDocType> &
  UserDocType & { _id: ObjectId };

const UserSchema: PassportLocalSchema<UserDocType, unknown> =
  new Schema<UserDocType>({
    displayName: String,
    password: String,
    emailAddress: { type: String, unique: true },
  });

UserSchema.plugin(passportLocalMongoose, { usernameField: 'emailAddress' });
export const UserModel: PassportLocalModel<HydratedDocument<UserDocType>> =
  mongoose.model('User', UserSchema, 'User');

passport.use(UserModel.createStrategy());
// TODO #25: Remove `any` cast. These methods have the wrong type.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser(UserModel.serializeUser() as any);
passport.deserializeUser(UserModel.deserializeUser());

const SESSION_SECRET = envGet('SESSION_SECRET', { throwIfNotFound: true });

export function initUserModels(app: Express): void {
  const store = MongoStore.create({
    mongoUrl: MONGO_DB_URI,
    ttl: 1000 * 365 * 24 * 60 * 60,
  });
  const sessionConfig = expressSession({
    cookie: {
      maxAge: 1000 * 3600 * 24 * 365 * 1000,
    },

    // forces the session to be saved back to the session store
    resave: false,
    // forces a session that is “uninitialized” to be saved to the store
    saveUninitialized: false,
    secret: SESSION_SECRET,
    store,
  });
  app.use(sessionConfig);
  app.use(passport.initialize());
  app.use(passport.session());
}
