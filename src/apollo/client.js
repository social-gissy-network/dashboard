import { DEFAULT_SERVER_URL } from '@config';
import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';

export const client = new ApolloClient({
  uri: process.env.SERVER_URL || DEFAULT_SERVER_URL,
  fetch,
});
