import { STORE } from '@constants';
import { createStore } from 'reusable';
import useStore from './useStore';

const useMode = () => {
  const {
    controller: { [STORE.MODE]: value },
  } = useStore();

  return value;
};

export default createStore(useMode);
