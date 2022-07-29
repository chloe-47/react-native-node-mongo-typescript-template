import { ApolloError } from '@apollo/client';
import createEventStream from 'src/client/event_stream/createEventStream';

export type ErrorToastEventStreamEvent = {
  error: ApolloError;
  message: string;
};

export const ErrorToastEventStream =
  createEventStream<ErrorToastEventStreamEvent>();
