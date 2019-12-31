import { useController } from '@hooks';
import { STORE } from '@constants';

const useSelectedNodes = () => {
  const {
    controller: {
      [STORE.SELECTED_NODES]: { value: nodes },
    },
  } = useController();

  return nodes;
};

export default useSelectedNodes;
