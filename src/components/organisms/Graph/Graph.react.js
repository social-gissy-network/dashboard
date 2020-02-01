import { CONFIG_GRAPH } from '@config';
import { STORE } from '@constants';
import { useStore } from '@hooks';
import React from 'react';
import ArcGraph from './ArcGraph.react';
import NetworkGraph from './NetworkGraph.react';

const {
  TYPES: { ARC, NETWORK },
} = CONFIG_GRAPH;

const GRAPH = {
  [ARC]: <ArcGraph />,
  [NETWORK]: <NetworkGraph />,
};

const { GRAPH_TYPE } = STORE;

const Graph = () => {
  const {
    controller: { [GRAPH_TYPE]: graphType },
  } = useStore();

  return <>{GRAPH[graphType]}</>;
};

export default Graph;
