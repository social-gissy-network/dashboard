import { useArcs, useStore } from '@hooks';
import { useCallback } from 'react';
import { PALETTE } from '@styles';
import { STORE } from '@constants';

const useNetwork = () => {
  const { data, loading } = useArcs();

  const {
    [STORE.SELECTED_NODES]: { set: setSelectedNodes },
  } = useStore();

  const setOnClickNode = useCallback(
    nodesMap => ids => setSelectedNodes(ids.map(id => nodesMap[id])),
    [setSelectedNodes],
  );

  if (!loading) {
    const nodesMap = data.reduce((acc, { startNode, stopNode }) => {
      const { name: nameStart } = startNode;
      const { name: nameStop } = stopNode;

      acc[startNode.id] = { label: nameStart, ...startNode };
      acc[stopNode.id] = { label: nameStop, ...stopNode, color: PALETTE.SECONDARY };
      return acc;
    }, {});

    const edgesMap = data.reduce((acc, { startNode: { id: from }, stopNode: { id: to } }) => {
      acc[`${from}.${to}`] = { from, to };
      return acc;
    }, {});

    const nodes = Object.values(nodesMap);
    const edges = Object.values(edgesMap);

    return { data: { nodes, edges }, loading, onClickNode: setOnClickNode(nodesMap) };
  }
  return { loading };
};

export default useNetwork;
