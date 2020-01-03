import React, { useEffect } from 'react';
import { Card } from '@components';
import { useSelectedNodes } from '@hooks';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import PropTypes from 'prop-types';

const Container = styled(Card)`
  ${tw`max-h-screen overflow-auto`}
  max-height: 20vh;
`;

const EMPTY = 'No Nodes Selected';
const NOOP = () => {};

const NodeInfo = ({ onChange = NOOP }) => {
  const [nodes] = useSelectedNodes();
  const hasNodes = nodes.length === 0;

  useEffect(() => {
    onChange(nodes);
  }, [nodes, onChange]);

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

NodeInfo.propTypes = {
  onChange: PropTypes.func,
};

export default NodeInfo;
