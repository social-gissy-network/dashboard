import React from 'react';
import PropTypes from 'prop-types';
import tw from 'tailwind.macro';
import { Card } from '@components';
import styled from 'styled-components';

const CardAbsolute = styled(Card)`
  ${tw`absolute z-20 pointer-events-none`}
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
`;

const Tooltip = ({ children, pointer }) => <CardAbsolute {...pointer}>{children}</CardAbsolute>;
Tooltip.propTypes = {
  pointer: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default Tooltip;
