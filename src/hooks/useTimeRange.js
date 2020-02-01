import { STORE } from '@constants';
import useStore from './useStore';

const { TIME_RANGE } = STORE;

const useTimeRange = () => {
  const {
    controller: { [TIME_RANGE]: value },
  } = useStore();

  return value;
};

export default useTimeRange;
