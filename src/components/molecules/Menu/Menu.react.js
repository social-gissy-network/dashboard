import { Card, IconButton, Select } from '@components';
import { CONFIG_MAP } from '@config';
import { mixins } from '@styles';
import PropTypes from 'prop-types';
import React from 'react';
import useForm from 'react-hook-form';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const Form = styled.form`
  ${mixins.flexCenter}
  ${tw`flex-col`}
  * {
    ${tw`m-1`}
  }
`;

const noop = () => {};

const Menu = ({ onSubmit = noop }) => {
  const { register, handleSubmit } = useForm();

  const onFormSubmit = data => {
    onSubmit(data);
  };

  return (
    <Card>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Select name="mapStyle" registerRef={register}>
          {CONFIG_MAP.MAP_STYLE.map(mapStyle => (
            <Select.Option key={mapStyle} value={mapStyle}>
              {mapStyle}
            </Select.Option>
          ))}
        </Select>
        <IconButton type="submit">Apply</IconButton>
      </Form>
    </Card>
  );
};

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Menu;
