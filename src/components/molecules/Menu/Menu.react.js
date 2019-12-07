import { Card, IconButton, Select, Input } from '@components';
import { CONFIG_MAP, CONFIG_GRAPH } from '@config';
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
    GRAPH_TYPE: { setGraphType },
  } = useContext(GissyContext);

  const onFormSubmit = ({ mapStyle, limit, graphType }) => {
    setMapStyle(mapStyle);
    setLimit(Number(limit));
    setGraphType(graphType);
  };

  return (
    <Card>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Select name="graphType" register={register}>
          {Object.values(CONFIG_GRAPH.TYPES).map(type => (
            <Select.Option key={type} value={type}>
              {type}
            </Select.Option>
          ))}
        </Select>
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
