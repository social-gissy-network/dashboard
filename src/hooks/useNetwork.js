import { STORE } from '@constants';
import { PALETTE } from '@styles';
import isEqual from 'lodash.isequal';
import { useCallback } from 'react';
import useData from './useData';
import useNetworkOptions from './useNetworkOptions';

const { SELECTED_NODES } = STORE;

const setGetNodeInfo = nodesMap => id => nodesMap[id];
const setGetEdgeInfo = edgesMap => id => edgesMap[id];

const useNetwork = () => {
  const { data, loading } = useData();

  const { visible, hierarchical, physics, set } = useNetworkOptions();

  const setOnClickNode = useCallback(
    nodesMap => ids =>
      set(controller => {
        const { [SELECTED_NODES]: prev } = controller;
        const curr = ids.map(id => nodesMap[id]);
        return { ...controller, [SELECTED_NODES]: isEqual(prev, curr) ? prev : curr };
      }),
    [set],
  );

  if (!loading) {
    const nodesMap = data.reduce((acc, { startNode, stopNode }) => {
      const { name: nameStart } = startNode;
      const { name: nameStop } = stopNode;

      acc[startNode.id] = { label: nameStart, isSource: true, ...startNode };
      acc[stopNode.id] = {
        label: nameStop,
        isSource: false,
        ...stopNode,
        color: PALETTE.SECONDARY,
      };
      return acc;
    }, {});

    const edgesMap = data.reduce(
      (acc, { id, startNode: { id: from }, stopNode: { id: to }, ...rest }) => {
        acc[id] = { from, to, id, ...rest };
        return acc;
      },
      {},
    );

    const nodes = Object.values(nodesMap);
    const edges = Object.values(edgesMap);

    return {
      data: { nodes, edges },
      loading,
      onClickNode: setOnClickNode(nodesMap),
      getNodeInfo: setGetNodeInfo(nodesMap),
      getEdgeInfo: setGetEdgeInfo(edgesMap),
      options: {
        hierarchical,
        visible,
        physics,
      },
    };
  }
  return { loading };
};

export default useNetwork;
