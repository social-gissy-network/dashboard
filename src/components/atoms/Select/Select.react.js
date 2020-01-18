import { IconSelectArrow } from '@icons';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const Container = tw.div`inline-block relative`;

const SelectStyled = styled.select`
  ${tw`appearance-none w-full bg-white border
    border-gray-400 hover:border-gray-500 px-4 py-2 pr-8
    rounded shadow leading-tight focus:outline-none focus:shadow-outline`}
`;

const IconContainer = styled.div`
  ${tw`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700`}
  > svg {
    ${tw`fill-current h-4 w-4`}
  }
`;

const Select = ({ children, name, register, defaultValue, onChange }) => (
  <Container>
    <SelectStyled defaultValue={defaultValue} ref={register} name={name} onChange={onChange}>
      {children}
    </SelectStyled>
    <IconContainer>
      <IconSelectArrow />
    </IconContainer>
  </Container>
);

const Option = ({ value, children }, ref) => (
  <option ref={ref} key={value} value={value}>
    {children}
  </option>
);

Select.Option = forwardRef(Option);

Option.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
};

Select.propTypes = {
  children: PropTypes.node.isRequired,
  register: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default Select;
