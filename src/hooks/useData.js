import { STORE } from '@constants';
import { useEdges, usePaths, useStore } from '@hooks';
import { useEffect } from 'react';
import { createStore } from 'reusable';

const { IS_PATH_CALCULATION } = STORE;

const useData = () => {
  const {
    controller: { [IS_PATH_CALCULATION]: isPathCalculation },
    submit: { value: isSubmit, set },
  } = useStore();

  const edges = useEdges({ skip: isPathCalculation });
  const paths = usePaths({ skip: !isSubmit || !isPathCalculation });

  const { data, loading } = paths;

  useEffect(() => {
    if (!loading) {
      set(false);
    }
  }, [data, loading, set]);

  return isPathCalculation ? paths : edges;
};

export default createStore(useData);
