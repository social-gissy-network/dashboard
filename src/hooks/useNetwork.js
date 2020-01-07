import { STORE } from '@constants';
import { useData, useStore } from '@hooks';
import { PALETTE } from '@styles';
import isEqual from 'lodash.isequal';
import { useCallback } from 'react';
import { createStore } from 'reusable';

const { IS_EDGE_VISIBLE, IS_HIERARCHICAL_VIEW, SELECTED_NODES, IS_PHYSICS_ENABLED } = STORE;

const useNetwork = () => {
  const { data, loading } = useData();

  const {
    controller: {
      [IS_EDGE_VISIBLE]: visible,
      [IS_HIERARCHICAL_VIEW]: hierarchical,
      [IS_PHYSICS_ENABLED]: physics,
    },
    set,
  } = useStore();

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
        physics,
      },
    };
  }
  return { loading };
};

export default createStore(useNetwork);
