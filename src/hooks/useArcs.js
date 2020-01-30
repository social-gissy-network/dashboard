import { MODES } from '@config';
import { STORE } from '@constants';
import { useData, useStore } from '@hooks';

const { MAP_STYLE, IS_EDGE_VISIBLE, SELECTED_NODES, MODE } = STORE;

const useArcs = () => {
  const {
    controller: {
      [MAP_STYLE]: mapStyle,
      [IS_EDGE_VISIBLE]: isEdgeVisible,
      [SELECTED_NODES]: selectedNodes,
      [MODE]: mode,
    },
    set,
  } = useStore();

  const { data, loading } = useData();

  const showSelectedNodes = mode === MODES.path;

  return {
    data,
    loading,
    mapStyle,
    isEdgeVisible,
    selectedNodes: { value: selectedNodes, set: set, visible: showSelectedNodes },
  };
};

export default useArcs;
