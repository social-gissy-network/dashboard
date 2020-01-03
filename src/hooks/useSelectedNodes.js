import { useController } from '@hooks';
import { STORE } from '@constants';

const useSelectedNodes = () => {
  const {
    controller: {
      [STORE.SELECTED_NODES]: { value, set },
    },
  } = useController();

  return [value, set];
};

export default useSelectedNodes;
