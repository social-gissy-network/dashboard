import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { mixins } from '@styles';
import styled from 'styled-components';

const IconButton = styled.button`
  ${mixins.button}
`;

const Button = ({ children, className }, ref) => (
  <IconButton ref={ref} className={className}>
    {children}
  </IconButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default forwardRef(Button);
