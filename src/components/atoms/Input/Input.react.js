import React from 'react';
import PropTypes from 'prop-types';
import tw from 'tailwind.macro';

const StyledInput = tw.input`
  block appearance-none w-full bg-white border
  border-gray-400 hover:border-gray-500 px-4 py-2
  leading-tight
  rounded shadow focus:outline-none focus:shadow-outline
`;

const Input = ({ name, register, placeholder }) => (
  <StyledInput type="number" ref={register} name={name} placeholder={placeholder} />
);

Input.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.func.isRequired,
};

export default Input;
