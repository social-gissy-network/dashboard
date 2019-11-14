import { SB_LABELS } from '@constants';
import React from 'react';
import NetworkGraph from './NetworkGraph.react';

export default {
  title: `${SB_LABELS.GRAPHS}Network Graph`,
};

export const InCard = () => <NetworkGraph />;
