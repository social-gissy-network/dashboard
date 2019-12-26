import useStore from './useStore';
import { STORE } from '@constants';
import { createStore } from 'reusable';

const useController = () => {
  const {
    [STORE.CONTROLLER]: { value, set },
    [STORE.SELECTED_NODES]: selectedNodesController,
    [STORE.TIME_RANGE]: timeRangeController,
  } = useStore();

  const controller = {
    controller: {
      ...value,
      [STORE.SELECTED_NODES]: selectedNodesController,
      [STORE.TIME_RANGE]: timeRangeController,
    },
    set,
  };

  return controller;
};

export default createStore(useController);
