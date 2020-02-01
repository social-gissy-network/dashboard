import { STORE } from '@constants';
import { useStore } from '@hooks';

const useSelectedNodes = () => {
  const {
    controller: { [STORE.SELECTED_NODES]: value },
  } = useStore();

  return [value];
};

export default useSelectedNodes;
