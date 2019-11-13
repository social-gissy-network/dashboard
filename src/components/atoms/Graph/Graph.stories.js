import { SB_LABELS } from '@constants';
import React from 'react';
import { Graph, Card } from '@components';

export default {
  title: `${SB_LABELS.ATOMS}|Graph`,
};

export const InCard = () => (
  <Card>
    <Graph />
  </Card>
);
