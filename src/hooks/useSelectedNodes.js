import { useStore } from '@hooks';
import { STORE } from '@constants';

const useSelectedNodes = () => {
  const {
    controller: { [STORE.SELECTED_NODES]: value },
  } = useStore();

  return [value];
};

export default useSelectedNodes;
