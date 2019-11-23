import { Card, IconButton, Select, Input } from '@components';
import { CONFIG_MAP } from '@config';
import { mixins } from '@styles';
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
    LIMIT: { setLimit },
  } = useContext(GissyContext);

  const onFormSubmit = ({ mapStyle, limit }) => {
    setMapStyle(mapStyle);
    setLimit(Number(limit));
  };

  return (
    <Card>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Select name="mapStyle" register={register}>
          {CONFIG_MAP.mapStyles.map(({ name, url }) => (
            <Select.Option key={name} value={url}>
              {name}
            </Select.Option>
          ))}
        </Select>
        <Input name="limit" type="number" register={register} placeholder="Limit" />
        <IconButton type="submit">Apply</IconButton>
      </Form>
    </Card>
  );
};

export default Menu;
