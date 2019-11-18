import React from 'react';
import { SB_LABELS } from '@constants';
import EdgeTooltip from './EdgeTooltip.react';
import { useArcs } from '@hooks';

export default {
  title: `${SB_LABELS.ATOMS}|Edge Tooltip`,
};

// TODO: query only the first
export const Default = () => {
  const data = useArcs();
  const [first] = data;
  return <EdgeTooltip data={first} />;
};
