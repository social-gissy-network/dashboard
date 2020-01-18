import { Card } from '@components';
import { useSelectedNodes } from '@hooks';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const Container = styled(Card)`
  ${tw`max-h-screen overflow-auto`}
  max-height: 20vh;
`;

const EMPTY = 'No Nodes Selected';
const NOOP = () => {};

const NodeInfo = ({ onChange = NOOP }) => {
  const [nodes] = useSelectedNodes();
  const hasNodes = nodes.length === 0;

  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      setTimeout(() => {
        onChange(nodes);
      }, 1000);
      isFirstLoad.current = false;
    } else {
      onChange(nodes);
    }
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
