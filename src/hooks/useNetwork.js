import { useArcs } from '@hooks';

const useNetwork = () => {
  const { data, loading } = useArcs();

  if (!loading) {
    const nodesMap = data.reduce((acc, { startNode, stopNode }) => {
      acc[startNode.id] = startNode;
      acc[stopNode.id] = stopNode;
      return acc;
    }, {});

    const nodes = Object.values(nodesMap);

    const links = data.map(({ startNode: { id: source }, stopNode: { id: target } }) => ({
      source,
      target,
      name: `${source.name} -> ${target.name}`,
    }));
    return { data: { nodes, links: links }, loading };
  }
  return { loading };
};

export default useNetwork;
