import { mixins } from '@styles';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const IconButton = styled.button`
  ${mixins.button}
`;

const NOOP = () => {};

const Button = ({ children, className, disabled = false, onClick = NOOP }) => (
  <IconButton className={className} disabled={disabled} onClick={onClick}>
    {children}
  </IconButton>
);

Button.Style = IconButton;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
