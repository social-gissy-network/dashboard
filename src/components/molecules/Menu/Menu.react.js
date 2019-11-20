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

const Menu = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  const onFormSubmit = ({ mapStyle }) => {
    onSubmit(mapStyle);
  };

  return (
    <Card>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Select name="mapStyle" registerRef={register}>
          {CONFIG_MAP.MAP_STYLES.map(({ name, url }) => (
            <Select.Option key={name} value={url}>
              {name}
            </Select.Option>
          ))}
        </Select>
        <IconButton type="submit">Apply</IconButton>
      </Form>
    </Card>
  );
};

Menu.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Menu;
