import { DEFAULT_SERVER_URL } from './default';

const SERVER = {
  url: process.env.SERVER_URL || DEFAULT_SERVER_URL,
};

export default SERVER;
