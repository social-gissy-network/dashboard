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
      acc[startNode.id] = startNode;
      acc[stopNode.id] = stopNode;
      return acc;
    }, {});

    const linksMap = data.reduce(
      (
        acc,
        { startNode: { id: source, name: sourceName }, stopNode: { id: target, name: targetName } },
      ) => {
        acc[`${source}.${target}`] = { source, target, name: `${sourceName} -> ${targetName}` };
        return acc;
      },
      {},
    );

    const nodes = Object.values(nodesMap);
    const links = Object.values(linksMap);
    return { data: { nodes, links }, loading, onClickNode: setOnClickNode(nodesMap) };
  }
  return { loading };
};

export default useNetwork;
