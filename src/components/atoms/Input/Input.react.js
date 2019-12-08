import React from 'react';
import PropTypes from 'prop-types';
import tw from 'tailwind.macro';
import styled from 'styled-components';

const Container = styled.input`
  ${tw`
    block appearance-none bg-white border leading-tight
    border-gray-400 hover:border-gray-500 px-4 py-2
    rounded shadow focus:outline-none focus:shadow-outline
  `}
`;

const Input = ({ name, register, placeholder, type, defaultValue, className }) => (
  <Container
    className={className}
    type={type}
    ref={register}
    name={name}
    placeholder={placeholder}
    defaultValue={defaultValue}
  />
);

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.func.isRequired,
};

export default Input;
