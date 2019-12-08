import { useArcs } from '@hooks';

const useNetwork = () => {
  const { data, loading } = useArcs();

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
    return { data: { nodes, links }, loading };
  }
  return { loading };
};

export default useNetwork;
