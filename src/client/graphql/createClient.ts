import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

export function createClient(uri: string): ApolloClient<NormalizedCacheObject> {
  const link = createHttpLink({
    uri,
  });
  const cache = new InMemoryCache({});

  const queryOptions: { errorPolicy: 'all' } = { errorPolicy: 'all' };

  const client = new ApolloClient({
    cache,
    credentials: 'include',
    defaultOptions: {
      mutate: queryOptions,
      query: queryOptions,
      watchQuery: queryOptions,
    },
    link,
  });

  return client;
}
