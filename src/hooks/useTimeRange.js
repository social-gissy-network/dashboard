import { STORE } from '@constants';
import useStore from './useStore';

const useTimeRange = () => {
  const {
    controller: { [STORE.TIME_RANGE]: value },
  } = useStore();

  return value;
};

export default useTimeRange;
