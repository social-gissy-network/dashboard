import React from 'react';
import PropTypes from 'prop-types';
import { mixins } from '@styles';
import styled from 'styled-components';

const SelectButton = styled.select`
  ${mixins.button}
`;

const Select = ({ children, className }) => (
  <SelectButton className={className}>{children}</SelectButton>
);

Select.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Select;
