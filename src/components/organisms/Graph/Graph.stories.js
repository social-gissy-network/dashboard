import { SB_LABELS } from '@constants';
import React from 'react';
import ArcGraph from './ArcGraph.react';
import NetworkGraphReact from './NetworkGraph.react';

export default {
  title: `${SB_LABELS.ORGANISMS}Graph`,
};

export const Arc = ArcGraph;
export const Network = () => <NetworkGraphReact />;
