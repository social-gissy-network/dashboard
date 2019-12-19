import { useArcs } from '@hooks';
import { GissyContext } from '@store';
import { useCallback, useContext } from 'react';

const useNetwork = () => {
  const { data, loading } = useArcs();

  const {
    NODE: { set: setNode },
  } = useContext(GissyContext);

  const setOnClickNode = useCallback(map => id => setNode(map[id]), [setNode]);

  if (!loading) {
    const nodesMap = data.reduce((acc, { startNode, stopNode }) => {
      const { name: nameStart } = startNode;
      const { name: nameStop } = stopNode;

      acc[startNode.id] = { label: nameStart, ...startNode };
      acc[stopNode.id] = { label: nameStop, ...stopNode };
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
