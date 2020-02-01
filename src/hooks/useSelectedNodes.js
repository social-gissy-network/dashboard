import { STORE } from '@constants';
import { useStore } from '@hooks';

const { SELECTED_NODES } = STORE;

const useSelectedNodes = () => {
  const {
    controller: { [SELECTED_NODES]: value },
    set,
  } = useStore();

  const setSelected = selected =>
    set(controller => ({ ...controller, [SELECTED_NODES]: selected }));

  return { value, set: setSelected };
};

export default useSelectedNodes;
