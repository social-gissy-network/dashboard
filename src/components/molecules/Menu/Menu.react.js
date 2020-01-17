import { Card, DateRange, IconButton, Input, NodeInfo, Select } from '@components';
import { CONFIG_DEFAULT, CONFIG_GRAPH, CONFIG_MAP, CONFIG_MENU, MODES } from '@config';
import { STORE } from '@constants';
import { useGraphType, useStore, useTypes } from '@hooks';
import { mixins } from '@styles';
import React, { useCallback, useEffect, useState } from 'react';
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

const InputHalf = styled(Input)`
  ${tw`w-1/2`}
`;

const SubmitButton = styled(Input)`
  ${tw`bg-pink-500 w-full text-white font-bold`}
`;

const Menu = () => {
  const { controller, setFromForm } = useStore();
  const { register, handleSubmit, setValue } = useForm({ defaultValues: controller });

  const [mode, setMode] = useState(CONFIG_DEFAULT[STORE.MODE]);

  const onSetMode = useCallback(({ target: { value } }) => setMode(value), []);

  const graphType = useGraphType();
  const edgesTypes = useTypes();

  const onDateChange = useCallback(value => setValue(STORE.TIME_RANGE, value), [setValue]);
  const onSelectNode = useCallback(value => setValue(STORE.SELECTED_NODES, value), [setValue]);

  useEffect(() => {
    register({ name: [STORE.TIME_RANGE] });
    register({ name: [STORE.SELECTED_NODES] });
  }, [register]);

  return (
    <Container>
      <Form
        onSubmit={handleSubmit(data => {
          setFromForm(data);
        })}>
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
          <InputHalf name={STORE.LIMIT} type="number" register={register} placeholder="Limit" />
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
        <Item visible={graphType === CONFIG_GRAPH.TYPES.NETWORK}>
          <label htmlFor={STORE.IS_PHYSICS_ENABLED}>Graph Physics</label>
          <input
            defaultChecked={CONFIG_DEFAULT.IS_PHYSICS_ENABLED}
            ref={register}
            name={STORE.IS_PHYSICS_ENABLED}
            type="checkbox"
          />
        </Item>
        <Item>
          <label htmlFor={STORE.IS_EDGE_VISIBLE}>Show Edges</label>
          <input
            defaultChecked={CONFIG_DEFAULT.IS_EDGES_VISIBLE}
            ref={register}
            name={STORE.IS_EDGE_VISIBLE}
            type="checkbox"
          />
        </Item>
        <Item>
          <label htmlFor={STORE.TIME_RANGE}>Dates Range</label>
          <DateRange onChange={onDateChange} />
        </Item>
        <Item>
          <label htmlFor={STORE.MODE}>Mode</label>
          <Select name={STORE.MODE} onChange={onSetMode} register={register}>
            {CONFIG_MENU.modes.map(mode => (
              <Select.Option key={mode} value={mode}>
                {mode}
              </Select.Option>
            ))}
          </Select>
        </Item>
        {edgesTypes.map(type => (
          <Item key={type}>
            <label>{type}</label>
            <Input
              register={register}
              name={`${STORE.EDGES_FILTER}.${type}`}
              placeholder="Dynamic Field"
            />
          </Item>
        ))}
        <Item visible={mode !== MODES.normal}>
          <label htmlFor={STORE.PATH_LIMIT}>Path Limit</label>
          <InputHalf
            name={STORE.PATH_LIMIT}
            register={register}
            type="number"
            placeholder="Insert Limit"
          />
        </Item>
        <Item visible={mode !== MODES.normal}>
          <label htmlFor={STORE.PATH_LENGTH}>Path Length</label>
          <InputHalf
            name={STORE.PATH_LENGTH}
            register={register}
            type="number"
            placeholder="Insert Length"
          />
        </Item>
        <Item visible={mode === MODES.topN}>
          <label htmlFor={STORE.TOP_NODES}>Top N Nodes</label>
          <InputHalf
            register={register}
            name={STORE.TOP_NODES}
            type="number"
            placeholder="Insert Number"
          />
        </Item>
        <Item>
          <SubmitButton type="submit" value="Apply" />
        </Item>
        <Item visible={mode === MODES.path}>
          <label htmlFor={STORE.SELECTED_NODES}>Selected Nodes</label>
          <NodeInfo onChange={onSelectNode} />
        </Item>
      </Form>
    </Container>
  );
};

export default Menu;
