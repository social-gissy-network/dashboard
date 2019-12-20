import { Card, IconButton, Input, Select, DateRange } from '@components';
import { CONFIG_GRAPH, CONFIG_MAP, CONFIG_DEFAULT } from '@config';
import { GissyContext } from '@store';
import { mixins } from '@styles';
import React, { useContext } from 'react';
import useForm from 'react-hook-form';
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

const ITEMS = {
  GRAPH_TYPE: 'graphType',
  MAP_STYLE: 'mapStyle',
  LIMIT: 'limit',
  DATES_RANGE: 'datesRange',
  NETWORK_OPTIONS: 'networkOptions',
};

const Menu = () => {
  const { register, watch } = useForm();

  const {
    MENU: { set },
    GRAPH_TYPE: { value: graphType },
  } = useContext(GissyContext);

  set(watch());

  return (
    <Container>
      <Form>
        <Item>
          <label htmlFor={ITEMS.GRAPH_TYPE}>Graph Type</label>
          <Select
            defaultValue={CONFIG_DEFAULT.GRAPH_TYPE}
            name={ITEMS.GRAPH_TYPE}
            register={register}>
            {Object.values(CONFIG_GRAPH.TYPES).map(type => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </Item>
        <Item visible={graphType === CONFIG_GRAPH.TYPES.ARC}>
          <label htmlFor={ITEMS.MAP_STYLE}>Map Style</label>
          <Select
            defaultValue={CONFIG_DEFAULT.MAP_STYLE}
            name={ITEMS.MAP_STYLE}
            register={register}>
            {CONFIG_MAP.mapStyles.map(({ name, url }) => (
              <Select.Option key={name} value={url}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Item>
        <Item>
          <label htmlFor={ITEMS.LIMIT}>Entries Limit</label>
          <InputNumber
            defaultValue={CONFIG_GRAPH.DEFAULT_LIMIT}
            name={ITEMS.LIMIT}
            type="number"
            register={register}
            placeholder="Limit"
          />
        </Item>
        <Item visible={graphType === CONFIG_GRAPH.TYPES.NETWORK}>
          <label htmlFor={ITEMS.NETWORK_OPTIONS}>Hierarchical View</label>
          <input
            defaultChecked={CONFIG_DEFAULT.NETWORK_OPTIONS}
            ref={register}
            name={ITEMS.NETWORK_OPTIONS}
            type="checkbox"
          />
        </Item>
        <Item>
          <label htmlFor={ITEMS.DATES_RANGE}>Dates Range</label>
          <DateRange />
        </Item>
      </Form>
    </Container>
  );
};

export default Menu;
