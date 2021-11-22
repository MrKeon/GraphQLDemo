import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Query {
        "A simple type for getting started!"
        hello: String,
        "Query source code of a specific url."
        source(url: String!): String,
  }
`;
