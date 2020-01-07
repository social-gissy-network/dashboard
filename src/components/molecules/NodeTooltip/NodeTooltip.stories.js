import { SB_LABELS } from '@constants';
import React from 'react';
import NodeTooltip from './NodeTooltip.react';

export default {
  title: `${SB_LABELS.TOOLTIPS}Node`,
};

const data = {
  isSource: false,
  x: undefined,
  y: undefined,
  data: {
    id: 54,
    name: 'Node',
  },
};

export const Source = () => <NodeTooltip info={{ ...data, isSource: true }} />;
export const Target = () => <NodeTooltip info={data} />;
