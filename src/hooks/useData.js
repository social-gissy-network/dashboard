import { MODES } from '@config';
import { STORE } from '@constants';
import { useEdges, usePaths, useStore } from '@hooks';
import { useEffect } from 'react';
import { createStore } from 'reusable';

const { MODE } = STORE;

const useData = () => {
  const {
    controller: { [MODE]: mode },
    submit: { value: isSubmit, set },
  } = useStore();

  const isPathCalculation = mode === MODES.path;

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
