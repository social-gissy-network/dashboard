import { Button } from '@components';
import { SB_LABELS } from '@constants';
import React from 'react';
import IconGraphql from './Graphql.svg.react';

export default {
  title: `${SB_LABELS.ICONS}/Graphql`,
};

export const Default = () => <IconGraphql />;

export const InButton = () => (
  <Button>
    <IconGraphql />
    <span>GraphQL Playground</span>
  </Button>
);
