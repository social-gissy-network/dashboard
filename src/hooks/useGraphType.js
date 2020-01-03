import { createStore } from 'reusable';
import { STORE } from '@constants';
import useStore from './useStore';

const useGraphType = () => {
  const {
    controller: { [STORE.GRAPH_TYPE]: value },
  } = useStore();

  return value;
};

export default createStore(useGraphType);
