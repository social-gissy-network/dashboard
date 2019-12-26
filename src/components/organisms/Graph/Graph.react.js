import React from 'react';
import { CONFIG_GRAPH } from '@config';
import { NetworkGraph, ArcGraph } from '@components';
import { useController } from '@hooks';
import { STORE } from '@constants';

const { TYPES } = CONFIG_GRAPH;

const GRAPH = {
  [TYPES.ARC]: <ArcGraph />,
  [TYPES.NETWORK]: <NetworkGraph />,
};

const Graph = () => {
  const {
    controller: { [STORE.GRAPH_TYPE]: graphType },
  } = useController();

  return <>{GRAPH[graphType]}</>;
};

export default Graph;
