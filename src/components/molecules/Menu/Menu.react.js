import { Card, DateRange, IconButton, Input, NodeInfo, Select } from '@components';
import { CONFIG_DEFAULT, CONFIG_GRAPH, CONFIG_MAP } from '@config';
import { STORE } from '@constants';
import { useController, useTypes } from '@hooks';
import { mixins } from '@styles';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const Form = styled.form`
  ${mixins.flexStart}
  ${tw`flex-col`}
  ${IconButton.Style} {
    ${tw`self-center`}
  }
`;

const Container = styled(Card)`
  ${tw`max-w-sm`}
`;

const Item = styled.div`
  ${mixins.flexBetween}
  display: ${({ visible = true }) => (visible ? 'flex' : 'none')};
  ${tw`w-full px-1 m-1`}
`;

const InputNumber = styled(Input)`
  ${tw`w-1/2`}
`;

const SubmitButton = styled(Input)`
  ${tw`bg-pink-500 w-full text-white font-bold`}
`;

const ADDITIONAL_ITEMS = {
  DATES_RANGE: 'datesRange',
  EDGE_FILTER: 'EDGE_FILTER',
};

const Menu = () => {
  const { controller, set } = useController();
  const { register, handleSubmit } = useForm({ defaultValues: controller });

  const { [STORE.GRAPH_TYPE]: graphType } = controller;
  const edgesTypes = useTypes();

  const onSubmit = data => {
    set(data);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Item>
          <label htmlFor={STORE.GRAPH_TYPE}>Graph Type</label>
          <Select name={STORE.GRAPH_TYPE} register={register}>
            {Object.values(CONFIG_GRAPH.TYPES).map(type => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </Item>
        <Item visible={graphType === CONFIG_GRAPH.TYPES.ARC}>
          <label htmlFor={STORE.MAP_STYLE}>Map Style</label>
          <Select name={STORE.MAP_STYLE} register={register}>
            {CONFIG_MAP.mapStyles.map(({ name, url }) => (
              <Select.Option key={name} value={url}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Item>
        <Item>
          <label htmlFor={STORE.LIMIT}>Entries Limit</label>
          <InputNumber name={STORE.LIMIT} type="number" register={register} placeholder="Limit" />
        </Item>
        <Item visible={graphType === CONFIG_GRAPH.TYPES.NETWORK}>
          <label htmlFor={STORE.IS_HIERARCHICAL_VIEW}>Hierarchical View</label>
          <input
            defaultChecked={CONFIG_DEFAULT.NETWORK_OPTIONS}
            ref={register}
            name={STORE.IS_HIERARCHICAL_VIEW}
            type="checkbox"
          />
        </Item>
        <Item>
          <label htmlFor={STORE.IS_EDGES_VISIBLE}>Show Edges</label>
          <input
            defaultChecked={CONFIG_DEFAULT.IS_EDGES_VISIBLE}
            ref={register}
            name={STORE.IS_EDGES_VISIBLE}
            type="checkbox"
          />
        </Item>
        <Item>
          <label htmlFor={ADDITIONAL_ITEMS.DATES_RANGE}>Dates Range</label>
          <DateRange />
        </Item>
        <Item>
          <label htmlFor={STORE.PATH_LENGTH}>Path Length</label>
          <InputNumber
            name={STORE.PATH_LENGTH}
            type="number"
            register={register}
            placeholder="Length"
          />
        </Item>
        {edgesTypes.map(type => (
          <Item key={type}>
            <label>{type}</label>
            <Input
              register={register}
              name={`${ADDITIONAL_ITEMS.EDGE_FILTER}.${type}`}
              placeholder="Dynamic Field"
            />
          </Item>
        ))}
        <Item>
          <label htmlFor={ADDITIONAL_ITEMS.DATES_RANGE}>Selected Nodes</label>
          <NodeInfo />
        </Item>
        <Item>
          <SubmitButton type="submit" />
        </Item>
      </Form>
    </Container>
  );
};

export default Menu;
