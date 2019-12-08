import React from 'react';
import PropTypes from 'prop-types';
import { mixins } from '@styles';
import styled from 'styled-components';

const IconButton = styled.button`
  ${mixins.button}
`;

const Button = ({ children, className }) => (
  <IconButton className={className}>{children}</IconButton>
);

Button.Style = IconButton;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
