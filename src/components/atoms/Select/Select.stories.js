import React from 'react';
import { SB_LABELS } from '@constants';
import Select from './Select.react';
import tw from 'tailwind.macro';

export default {
  title: `${SB_LABELS.ATOMS}Select`,
};

const options = [...Array(5).keys()].map(key => (
  <option key={key} value={key}>{`Option-${key}`}</option>
));

const Container = tw.div`w-1/2`;

export const Default = () => (
  <Container>
    <Select>{options}</Select>
  </Container>
);
