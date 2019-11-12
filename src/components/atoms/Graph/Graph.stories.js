import { SB_LABELS } from '@constants';
import React from 'react';
import Card from '../Card/Card.react';
import Graph from './Graph.react';

export default {
  title: `${SB_LABELS.ATOMS}|Graph`,
};

export const InCard = () => (
  <Card>
    <Graph />
  </Card>
);
