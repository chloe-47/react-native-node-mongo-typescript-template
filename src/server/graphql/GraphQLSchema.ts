import type { Express } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { SchemaComposer } from 'graphql-compose';
import { attributions } from 'src/server/graphql/attributions/attributions';
import { reportError } from 'src/server/graphql/reportError';
import { User } from 'src/server/user/UserGraphQLImpl';

const composer = new SchemaComposer();

composer.Query.addFields({
  ...User.QueryFields,
  attributions,
});

composer.Mutation.addFields({
  ...User.MutationFields,
  reportError,
});

const schema = composer.buildSchema();

export function initGraphQL(app: Express): void {
  app.use(
    '/graphql',
    graphqlHTTP({
      graphiql: true,
      schema,
    }),
  );
}
