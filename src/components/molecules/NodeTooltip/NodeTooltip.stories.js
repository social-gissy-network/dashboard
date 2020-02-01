import { SB_LABELS } from '@constants';
import React from 'react';
import NodeTooltip from './NodeTooltip.react';

export default {
  title: `${SB_LABELS.TOOLTIPS}Node`,
};

const data = {
  isSource: true,
  x: undefined,
  y: undefined,
  data: {
    id: 54,
    name: 'Node',
  },
};

export const Source = () => <NodeTooltip info={data} />;
export const Target = () => <NodeTooltip info={{ ...data, isSource: false }} />;
