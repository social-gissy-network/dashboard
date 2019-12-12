import React, { useContext } from 'react';
import { Card } from '@components';
import { GissyContext } from '@store';

const NodeInfo = () => {
  const {
    NODE: { value },
  } = useContext(GissyContext);

  return (
    <Card>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </Card>
  );
};

export default NodeInfo;
