import React from 'react';
import { SB_LABELS } from '@constants';
import Select from './Select.react';

export default {
  title: `${SB_LABELS.ATOMS}Select`,
};

const options = [...Array(5).keys()].map(key => (
  <option key={key} value={key}>{`Option-${key}`}</option>
));

export const Default = () => <Select>{options}</Select>;
