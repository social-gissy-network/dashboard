import { SB_LABELS } from '@constants';
import React from 'react';
import DagGraph from './DagGraph.react';

export default {
  title: `${SB_LABELS.GRAPHS}DAG Graph`,
};

export const InCard = () => <DagGraph />;
