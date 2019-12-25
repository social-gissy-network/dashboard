import useStore from './useStore';
import { STORE } from '@constants';
import { createStore } from 'reusable';

const useController = () => {
  const {
    [STORE.CONTROLLER]: { value, set },
  } = useStore();

  return { controller: value, set };
};

export default createStore(useController);
