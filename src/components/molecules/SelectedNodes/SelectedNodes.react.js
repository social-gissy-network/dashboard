import { Card, IconButton } from '@components';
import { useSelectedNodes } from '@hooks';
import { mixins, Text } from '@styles';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const Container = styled(Card)`
  ${mixins.flexCenter}
  ${tw`overflow-auto flex-col`}
  max-height: 20vh;
`;

const SmallButton = styled(IconButton)`
  ${tw`p-1 w-full`}
`;

const NOOP = () => {};

const SelectedNodes = ({ onChange = NOOP, onClear = NOOP }) => {
  const nodes = useSelectedNodes();
  const hasNodes = nodes.length !== 0;

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
      {nodes.map(({ id, name }) => (
        <div key={id}>
          <Text strong>{id}: </Text>
          <Text>{name.slice(0, 10)}...</Text>
        </div>
      ))}
      {hasNodes ? (
        <SmallButton onClick={onClear}>Clear</SmallButton>
      ) : (
        <Text strong>No Nodes Selected</Text>
      )}
    </Container>
  );
};

SelectedNodes.propTypes = {
  onChange: PropTypes.func,
  onClear: PropTypes.func,
};

export default SelectedNodes;
