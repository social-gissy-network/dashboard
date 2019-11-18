import React from 'react';
import PropTypes from 'prop-types';
import tw from 'tailwind.macro';
import { Card } from '@components';
import styled from 'styled-components';
import { PALETTE } from '@styles';

const Tooltip = styled(Card)`
  ${tw`absolute z-20 pointer-events-none`}
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
`;

const Text = styled.span`
  color: ${({ color }) => color};
`;

const EdgeTooltip = ({ data, pointer = { x: undefined, y: undefined } }) => {
  const {
    startNode: { name: source },
    stopNode: { name: target },
  } = data;

  // &#10230; ⟶
  return (
    <Tooltip {...pointer}>
      <Text color={PALETTE.PRIMARY}>{source}</Text>
      <span> &#10230; </span>
      <Text color={PALETTE.SECONDARY}>{target}</Text>
    </Tooltip>
  );
};

EdgeTooltip.propTypes = {
  data: PropTypes.object.isRequired,
  pointer: PropTypes.object.isRequired,
};

export default EdgeTooltip;
