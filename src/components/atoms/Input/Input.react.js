import { mixins } from '@styles';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Container = styled.input`
  ${mixins.box}
`;

const Input = ({ name, register, placeholder, type, defaultValue, className, value }) => (
  <Container
    value={value}
    className={className}
    type={type}
    ref={register}
    name={name}
    placeholder={placeholder}
    defaultValue={defaultValue}
  />
);

Input.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.func,
};

export default Input;
