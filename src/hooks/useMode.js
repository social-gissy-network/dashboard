import { STORE } from '@constants';
import useStore from './useStore';

const { MODE } = STORE;

const useMode = () => {
  const {
    controller: { [MODE]: value },
    set,
  } = useStore();

  const setMode = mode => set(controller => ({ ...controller, [MODE]: mode }));

  return { value, set: setMode };
};

export default useMode;
