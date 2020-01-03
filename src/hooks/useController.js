import useStore from './useStore';
import { STORE } from '@constants';
import { createStore } from 'reusable';

const { CONTROLLER, SELECTED_NODES } = STORE;

const useController = () => {
  const {
    [CONTROLLER]: { value, set },
    [SELECTED_NODES]: selectedController,
  } = useStore();

  const controller = {
    controller: { ...value, [SELECTED_NODES]: selectedController },
    set,
  };

  return controller;
};

export default createStore(useController);
