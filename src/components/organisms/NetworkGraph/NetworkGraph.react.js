import { EdgeTooltip, Loading, NodeTooltip } from '@components';
import { CONFIG_GRAPH } from '@config';
import { useNetwork } from '@hooks';
import { mixins } from '@styles';
import isEqual from 'lodash.isequal';
import React, { memo, useMemo, useState } from 'react';
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
  const {
    data,
    loading,
    onClickNode,
    options: storeOptions,
    getNodeInfo,
    getEdgeInfo,
  } = useNetwork();
  const [edgeInfo, setEdgeInfo] = useState();
  const [nodeInfo, setNodeInfo] = useState();

  const events = useMemo(
    () => ({
      selectNode: event => {
        const { nodes } = event;
        onClickNode(nodes);
      },
      hoverNode: ({ event: { clientX: x, clientY: y }, node }) => {
        /* eslint-disable no-unused-vars */
        const { __typename, color, label, ...data } = getNodeInfo(node);
        setNodeInfo({ x, y, data });
      },
      blurNode: () => setNodeInfo(undefined),
      hoverEdge: ({ event: { clientX: x, clientY: y }, edge }) => {
        const { from, to } = getEdgeInfo(edge);
        const data = {
          startNode: getNodeInfo(from),
          stopNode: getNodeInfo(to),
        };
        setEdgeInfo({ x, y, data });
      },
      blurEdge: () => setEdgeInfo(undefined),
    }),
    [getEdgeInfo, getNodeInfo, onClickNode],
  );

  const options = useMemo(() => NETWORK({ height: `${window.innerHeight}px`, ...storeOptions }), [
    storeOptions,
  ]);

  return (
    <Container>
      {edgeInfo && <EdgeTooltip info={edgeInfo} />}
      {nodeInfo && <NodeTooltip info={nodeInfo} />}
      {loading ? <Loading /> : <MemoGraph graph={data} options={options} events={events} />}
    </Container>
  );
};

export default memo(NetworkGraph);
