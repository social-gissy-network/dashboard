import React from 'react';
import { SB_LABELS } from '@constants';
import { useArcs } from '@hooks';
import Tooltip from './Tooltip.react';
import { PALETTE, Text } from '@styles';

export default {
  title: `${SB_LABELS.ATOMS}Tooltip`,
};

// TODO: query only the first
export const Default = () => {
  const data = useArcs();
  const [first] = data;
  const {
    startNode: { name: source },
    stopNode: { name: target },
  } = first;

  // &#10230; ⟶
  return (
    <Tooltip>
      <Text color={PALETTE.PRIMARY}>{source}</Text>
      <span> &#10230; </span>
      <Text color={PALETTE.SECONDARY}>{target}</Text>
    </Tooltip>
  );
};
