import { STORE } from '@constants';
import useStore from './useStore';

const { IS_EDGE_VISIBLE, IS_HIERARCHICAL_VIEW, IS_PHYSICS_ENABLED } = STORE;

const useNetworkOptions = () => {
  const {
    controller: {
      [IS_EDGE_VISIBLE]: visible,
      [IS_HIERARCHICAL_VIEW]: hierarchical,
      [IS_PHYSICS_ENABLED]: physics,
    },
    set,
  } = useStore();

  return { visible, hierarchical, physics, set };
};

export default useNetworkOptions;
