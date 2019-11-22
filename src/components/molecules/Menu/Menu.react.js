import { Card, IconButton, Select } from '@components';
import { CONFIG_MAP } from '@config';
import { mixins } from '@styles';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import useForm from 'react-hook-form';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { GissyContext } from '@store';

const Form = styled.form`
  ${mixins.flexCenter}
  ${tw`flex-col`}
  * {
    ${tw`m-1`}
  }
`;

const Menu = () => {
  const { register, handleSubmit } = useForm();

  const {
    STYLE: { setMapStyle },
  } = useContext(GissyContext);

  const onFormSubmit = ({ mapStyle }) => {
    setMapStyle(mapStyle);
  };

  return (
    <Card>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Select name="mapStyle" registerRef={register}>
          {CONFIG_MAP.mapStyles.map(({ name, url }) => (
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
