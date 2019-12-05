import React from 'react';
import { SB_LABELS } from '@constants';
import { useArcs } from '@hooks';
import NodeTooltip from './NodeTooltip.react';

export default {
  title: `${SB_LABELS.TOOLTIPS}Node`,
};

// TODO: query only the first
export const Default = () => {
  const { data, loading } = useArcs();
  const [first] = data;
  return !loading && <NodeTooltip info={{ data: first }} />;
};
