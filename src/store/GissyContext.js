import { createContext } from 'react';

const GissyContext = createContext();

const dispatch = () => {};

export const store = { dispatch, STYLE: {}, TIME: {}, LIMIT: {}, NODE: {} };

export default GissyContext;
