import { STORE } from '@constants';
import { useStore } from '@hooks';
import { unixToDbTime } from '@utils';
import { createStore } from 'reusable';

const useQueryVariables = () => {
  const {
    controller: {
      [STORE.TIME_RANGE]: timeRange,
      [STORE.LIMIT]: limit,
      [STORE.PATH_LENGTH]: length,
      [STORE.SELECTED_NODES]: nodesInfo,
      [STORE.EDGES_FILTER]: filters,
      [STORE.PATH_LIMIT]: pathLimit,
    },
  } = useStore();

  const [min, max] = timeRange.map(unixToDbTime);

  const nodes = nodesInfo.map(({ id }) => id);

  return { min, max, limit, pathLimit, length, nodes, filters };
};

export default createStore(useQueryVariables);
