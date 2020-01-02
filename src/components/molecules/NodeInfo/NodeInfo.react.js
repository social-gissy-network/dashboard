import React from 'react';
import { Card } from '@components';
import { useSelectedNodes } from '@hooks';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const Container = styled(Card)`
  ${tw`max-h-screen overflow-auto`}
  max-height: 20vh;
`;

const EMPTY = 'No Nodes Selected';

const NodeInfo = () => {
  const nodes = useSelectedNodes();
  const hasNodes = nodes.length === 0;

  return (
    <Container>
      {hasNodes && EMPTY}
      {nodes.map(node => (
        <div key={node.id}>
          <span>{node.id}</span>
          <br />
        </div>
      ))}
    </Container>
  );
};

export default NodeInfo;
