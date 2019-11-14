import React from 'react';
import { SB_LABELS } from '@constants';
import IconButton from './Button.react';
import { IconLogo } from '../icons';

export default {
  title: `${SB_LABELS.ATOMS}|Select`,
};

export const Default = () => <IconButton>Some Text</IconButton>;
export const WithIcon = () => (
  <IconButton>
    <IconLogo />
    <span>Some Text</span>
  </IconButton>
);
