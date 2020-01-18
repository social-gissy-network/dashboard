import { STORE } from '@constants';
import useStore from './useStore';

const useMode = () => {
  const {
    controller: { [STORE.MODE]: value },
  } = useStore();

  return value;
};

export default useMode;
