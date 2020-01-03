import { STORE } from '@constants';
import { useController, useData } from '@hooks';
import { PALETTE } from '@styles';
import isEqual from 'lodash.isequal';
import { useCallback } from 'react';
import { createStore } from 'reusable';

const useNetwork = () => {
  const { data, loading } = useData();

  const {
    controller: {
      [STORE.SELECTED_NODES]: { set: setSelectedNodes },
      [STORE.IS_EDGE_VISIBLE]: visible,
      [STORE.IS_HIERARCHICAL_VIEW]: hierarchical,
    },
  } = useController();

  const setOnClickNode = useCallback(
    nodesMap => ids =>
      setSelectedNodes(prev => {
        const curr = ids.map(id => nodesMap[id]);
        return isEqual(prev, curr) ? prev : curr;
      }),
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
      acc[`${from}.${to}`] = { from, to, id: `${from}-${to}` };
      return acc;
    }, {});

    const nodes = Object.values(nodesMap);
    const edges = Object.values(edgesMap);

    return {
      data: { nodes, edges },
      loading,
      onClickNode: setOnClickNode(nodesMap),
      options: {
        hierarchical,
        visible,
      },
    };
  }
  return { loading };
};

export default createStore(useNetwork);
