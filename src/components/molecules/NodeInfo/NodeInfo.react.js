import React from 'react';
import { Card } from '@components';
import { STORE } from '@constants';
import { useStore } from '@hooks';

const NodeInfo = () => {
  const {
    [STORE.SELECTED_NODES]: { value: nodes },
  } = useStore();

  return (
    <Card>
      {nodes.map(node => (
        <div key={node.id}>
          <span>{node.id}</span>
          <br />
        </div>
      ))}
    </Card>
  );
};

export default NodeInfo;
