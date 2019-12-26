import { Loading } from '@components';
import { CONFIG_GRAPH } from '@config';
import { useNetwork } from '@hooks';
import { mixins } from '@styles';
import React, { memo, useMemo } from 'react';
import VisNetwork from 'react-graph-vis';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const Container = styled.div`
  ${mixins.flexCenter}
  ${tw`min-h-screen`}
  background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
`;

const { NETWORK } = CONFIG_GRAPH;

const NetworkGraph = () => {
  const { data, loading, onClickNode, options } = useNetwork();

  const events = useMemo(
    () => ({
      select: event => {
        const { nodes } = event;
        onClickNode(nodes);
      },
    }),
    [onClickNode],
  );

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <VisNetwork
          graph={data}
          options={NETWORK({ height: `${window.innerHeight}px`, ...options })}
          events={events}
        />
      )}
    </Container>
  );
};

export default memo(NetworkGraph);
