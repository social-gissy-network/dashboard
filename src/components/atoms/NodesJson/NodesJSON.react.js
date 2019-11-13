import React from 'react';
import { useNodes } from '@hooks';

const NodesJson = () => {
  const nodes = useNodes();

  return <pre>{JSON.stringify(nodes, null, 2)}</pre>;
};

export default NodesJson;
