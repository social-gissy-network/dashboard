import { STORE } from '@constants';
import { createStore } from 'reusable';
import { useStore, useData } from '@hooks';

const { MAP_STYLE, IS_EDGE_VISIBLE, SELECTED_NODES } = STORE;

const useArcs = () => {
  const {
    controller: { [MAP_STYLE]: mapStyle, [IS_EDGE_VISIBLE]: visible, [SELECTED_NODES]: value },
    set,
  } = useStore();

  const { data, loading } = useData();

  return { data, loading, mapStyle, visible, selectedNodes: { value, set: set } };
};

export default createStore(useArcs);
