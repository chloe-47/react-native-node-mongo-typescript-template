import { createClient } from 'src/client/graphql/createClient';
import { GraphQLClientURI } from 'src/client/graphql/GraphQLClientURI';

export const graphqlClient = createClient(GraphQLClientURI);
