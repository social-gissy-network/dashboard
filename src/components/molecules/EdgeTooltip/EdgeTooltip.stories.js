import React from 'react';
import { SB_LABELS } from '@constants';
import { useArcs } from '@hooks';
import EdgeTooltip from './EdgeTooltip.react';

export default {
  title: `${SB_LABELS.TOOLTIPS}Edge`,
};

// TODO: query only the first
export const Default = () => {
  const data = useArcs();
  const [first] = data;

  // &#10230; ⟶
  return <EdgeTooltip info={{ data: first }} />;
};
