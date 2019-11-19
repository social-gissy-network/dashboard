import React from 'react';
import { SB_LABELS } from '@constants';
import Range from './Range.react';

export default {
  title: `${SB_LABELS.ATOMS}Range`,
};

const options = [...Array(5).keys()].map(key => (
  <option key={key} value={key}>{`Option-${key}`}</option>
));

export const Default = () => <Range>{options}</Range>;
