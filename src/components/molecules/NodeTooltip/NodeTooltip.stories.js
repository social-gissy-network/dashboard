import React from 'react';
import { SB_LABELS } from '@constants';
import NodeTooltip from './NodeTooltip.react';

export default {
  title: `${SB_LABELS.TOOLTIPS}Node`,
};

const data = {
  isSource: false,
  x: undefined,
  y: undefined,
  data: {
    startNode: { name: 'source' },
    stopNode: { name: 'target' },
  },
};

export const Source = () => <NodeTooltip />;
export const Target = () => <NodeTooltip info={data} />;
