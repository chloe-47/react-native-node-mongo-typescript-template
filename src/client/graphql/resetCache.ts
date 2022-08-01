import { graphqlClient } from 'src/client/graphql/graphqlClient';
import { reloadViewer } from 'src/client/viewer';

export async function resetCache(): Promise<void> {
  await graphqlClient.cache.reset();
  await graphqlClient.resetStore();
  await reloadViewer();
}
