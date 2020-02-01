import { STORE } from '@constants';
import { toBoolean } from './string';

const { LIMIT, PATH_LENGTH, IS_EDGE_VISIBLE, IS_HIERARCHICAL_VIEW, PATH_LIMIT } = STORE;

const NUMBERS = [LIMIT, PATH_LENGTH, PATH_LIMIT];
const BOOLEANS = [IS_HIERARCHICAL_VIEW, IS_EDGE_VISIBLE];

const formToController = form => {
  const mapped = Object.entries(form).map(([key, value]) => [
    key,
    NUMBERS.includes(key) ? Number(value) : BOOLEANS.includes(value) ? toBoolean(value) : value,
  ]);

  return Object.fromEntries(mapped);
};

const noEmptyFilters = ([, value]) => !!value;

/* eslint-disable indent */
export const toGraphqlFilters = obj =>
  obj
    ? Object.fromEntries(
        Object.entries(obj)
          .filter(noEmptyFilters)
          .map(([key, value]) => [key, { eq: value }]),
      )
    : {};

export default formToController;
