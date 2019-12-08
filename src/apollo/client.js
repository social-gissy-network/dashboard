import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';

export const client = new ApolloClient({
  uri: process.env.SERVER_URL || `https://gissy-graphql.herokuapp.com/`,
  fetch,
});
