import { createStore } from 'reusable';
import { STORE } from '@constants';
import useStore from './useStore';

const useGraphType = () => {
  const {
    [STORE.CONTROLLER]: {
      value: { [STORE.GRAPH_TYPE]: value },
    },
  } = useStore();

  return value;
};

export default createStore(useGraphType);
