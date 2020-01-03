import { STORE } from '@constants';
import { useStore, usePaths, useEdges } from '@hooks';
import { createStore } from 'reusable';

const useData = () => {
  const {
    controller: { [STORE.IS_PATH_CALCULATION]: isPathCalculation },
  } = useStore();

  const edges = useEdges();
  const paths = usePaths();

  return isPathCalculation ? paths : edges;
};

export default createStore(useData);
