import { ArcGraph, NetworkGraph } from '@components';
import { CONFIG_GRAPH } from '@config';
import { STORE } from '@constants';
import { useStore } from '@hooks';
import React from 'react';

const {
  TYPES: { ARC, NETWORK },
} = CONFIG_GRAPH;

const GRAPH = {
  [ARC]: <ArcGraph />,
  [NETWORK]: <NetworkGraph />,
};

const Graph = () => {
  const {
    controller: { [STORE.GRAPH_TYPE]: graphType },
  } = useStore();

  return <>{GRAPH[graphType]}</>;
};

export default Graph;
