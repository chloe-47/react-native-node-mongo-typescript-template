import { schemaComposer } from 'graphql-compose';
import { config } from 'src/server/graphql/attributions/attribution-config';

const AttributionGraphQLType = schemaComposer.createObjectTC<Attribution>({
  fields: {
    icon: 'String!',
    text: 'String!',
  },
  name: 'Attribution',
});

type Attribution = {
  icon: string;
  text: string;
};

function attributionsResolver(): Array<Attribution> {
  return config;
}

export const attributions = {
  resolve: attributionsResolver,
  type: [AttributionGraphQLType],
};
