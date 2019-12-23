import React from 'react';
import { Card } from '@components';
import { STORE } from '@constants';
import { useStore } from '@hooks';
import styled from 'styled-components';
import tw from 'tailwind.macro';
const Container = styled(Card)`
  ${tw`max-h-screen overflow-auto`}
  max-height: 20vh;
`;

const NodeInfo = () => {
  const {
    [STORE.SELECTED_NODES]: { value: nodes },
  } = useStore();

  return (
    <Container>
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
