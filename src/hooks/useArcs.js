import { STORE } from '@constants';
import { createStore } from 'reusable';
import { useController, useData } from '@hooks';

const useArcs = () => {
  const {
    controller: {
      [STORE.MAP_STYLE]: mapStyle,
      [STORE.IS_EDGE_VISIBLE]: visible,
      [STORE.SELECTED_NODES]: selectedNodesController,
    },
  } = useController();

  const { data, loading } = useData();

  return { data, loading, mapStyle, visible, selectedNodes: selectedNodesController };
};

export default createStore(useArcs);
