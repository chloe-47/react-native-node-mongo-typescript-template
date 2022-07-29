import mongoose from 'mongoose';
import { USING_DEV_DB } from './env/USING_DEV_DB';

const mongoAnalytics = {
  track: ({ user, event, properties }: Message): void => {
    mongoose.connection.db.collection('analytics').insertOne({
      event,
      ...(properties ?? {}),
      timestamp: new Date(),
      userDisplayName: user?.displayName ?? '',
      userId: user == null ? '' : user._id.toString(),
      emailAddress: user?.emailAddress ?? '',
    });
  },
};

type Message = {
  user: Express.User | null;
  event: string;
  properties?: Record<string, string>;
};

export const analytics = {
  track: (message: Message): void => {
    const { event, properties, user } = message;
    mongoAnalytics.track(message);
    if (USING_DEV_DB) {
      console.log('[Event] ' + event);
    }
  },
};
