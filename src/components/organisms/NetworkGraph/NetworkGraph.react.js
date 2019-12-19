import { Loading } from '@components';
import { useNetwork } from '@hooks';
import { mixins } from '@styles';
import { CONFIG_GRAPH } from '@config';
import React, { memo } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import VisNetwork from 'react-graph-vis';

const Container = styled.div`
  ${mixins.flexCenter}
  ${tw`min-h-screen`}
  background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
`;

const { DAG } = CONFIG_GRAPH;

const DagGraph = () => {
  const { data, loading, onClickNode } = useNetwork();

  const events = {
    select: event => {
      const { nodes } = event;
      const [node] = nodes;
      onClickNode(node);
    },
  };

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : data.nodes.length ? (
        <VisNetwork
          graph={data}
          options={DAG({ height: `${window.innerHeight}px` })}
          events={events}
        />
      ) : (
        <div>Empty Data</div>
      )}
    </Container>
  );
};

export default memo(DagGraph);
