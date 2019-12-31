import { STORE } from '@constants';
import { useController } from '@hooks';
import { createStore } from 'reusable';
import { unixToDbTime } from '@utils';

const useQueryVariables = () => {
  const {
    controller: {
      [STORE.TIME_RANGE]: { value: timeRange },
      [STORE.LIMIT]: limit,
      [STORE.PATH_LENGTH]: length,
      [STORE.SELECTED_NODES]: { value: nodesInfo },
      [STORE.EDGES_FILTER]: filters,
    },
  } = useController();

  const [min, max] = timeRange.map(unixToDbTime);

  const nodes = nodesInfo.map(({ id }) => id);

  return { min, max, limit, length, nodes, filters };
};

export default createStore(useQueryVariables);
