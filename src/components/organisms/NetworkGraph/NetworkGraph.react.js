import { Loading } from '@components';
import { CONFIG_GRAPH } from '@config';
import { useNetwork } from '@hooks';
import { mixins } from '@styles';
import isEqual from 'lodash.isequal';
import React, { memo, useMemo } from 'react';
import VisNetwork from 'react-graph-vis';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const Container = styled.div`
  ${mixins.flexCenter}
  ${tw`min-h-screen`}
  background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
`;

const MemoGraph = memo(
  VisNetwork,
  ({ graph: a, options: opA }, { graph: b, options: opB }) => isEqual(a, b) && opA === opB,
);

const { NETWORK } = CONFIG_GRAPH;

const NetworkGraph = () => {
  const { data, loading, onClickNode, options: storeOptions } = useNetwork();

  const events = useMemo(
    () => ({
      selectNode: event => {
        const { nodes } = event;
        onClickNode(nodes);
      },
    }),
    [onClickNode],
  );

  const options = useMemo(() => NETWORK({ height: `${window.innerHeight}px`, ...storeOptions }), [
    storeOptions,
  ]);

  return (
    <Container>
      {loading ? <Loading /> : <MemoGraph graph={data} options={options} events={events} />}
    </Container>
  );
};

export default memo(NetworkGraph);
