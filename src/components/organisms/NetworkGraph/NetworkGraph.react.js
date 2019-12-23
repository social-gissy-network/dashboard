import { Loading } from '@components';
import { useNetwork, useStore } from '@hooks';
import { mixins } from '@styles';
import { CONFIG_GRAPH } from '@config';
import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import VisNetwork from 'react-graph-vis';
import { STORE } from '@constants';

const Container = styled.div`
  ${mixins.flexCenter}
  ${tw`min-h-screen`}
  background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
`;

const { NETWORK } = CONFIG_GRAPH;

const NetworkGraph = () => {
  const { data, loading, onClickNode } = useNetwork();

  const events = useMemo(
    () => ({
      select: event => {
        const { nodes } = event;
        onClickNode(nodes);
      },
    }),
    [onClickNode],
  );

  const {
    [STORE.NETWORK_OPTIONS]: { value: hierarchical },
    [STORE.IS_EDGES_VISIBLE]: { value: visible },
  } = useStore();

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : data.nodes.length ? (
        <VisNetwork
          graph={data}
          options={NETWORK({ height: `${window.innerHeight}px`, hierarchical, visible })}
          events={events}
        />
      ) : (
        <div>Empty Data</div>
      )}
    </Container>
  );
};

export default memo(NetworkGraph);
