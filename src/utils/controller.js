import { STORE } from '@constants';
import { toBoolean } from './string';

const { LIMIT, PATH_LENGTH, IS_EDGES_VISIBLE, IS_HIERARCHICAL_VIEW, IS_PATH_CALCULATION } = STORE;

const NUMBERS = [LIMIT, PATH_LENGTH];
const BOOLEANS = [IS_HIERARCHICAL_VIEW, IS_EDGES_VISIBLE, IS_PATH_CALCULATION];

const formToController = form => {
  const mapped = Object.entries(form).map(([key, value]) => [
    key,
    NUMBERS.includes(key) ? Number(value) : BOOLEANS.includes(value) ? toBoolean(value) : value,
  ]);

  return Object.fromEntries(mapped);
};

export default formToController;
