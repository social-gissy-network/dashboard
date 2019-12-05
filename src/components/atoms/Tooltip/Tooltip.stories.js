import React from 'react';
import { SB_LABELS } from '@constants';
import Tooltip from './Tooltip.react';

export default {
  title: `${SB_LABELS.ATOMS}Tooltip`,
};

export const Default = () => <Tooltip pointer={{ x: 0, y: 0 }}>Tooltip Text</Tooltip>;
