import React from 'react';
import { SB_LABELS } from '@constants';
import Input from './Input.react';
import tw from 'tailwind.macro';

export default {
  title: `${SB_LABELS.ATOMS}Input`,
};

const Container = tw.div`m-10`;

export const Default = () => (
  <Container>
    <Input />
  </Container>
);
