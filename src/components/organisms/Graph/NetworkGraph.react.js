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

const areEqual = ({ graph: a, options: opA }, { graph: b, options: opB }) => {
  if (
    opA.layout.hierarchical.enabled === opB.layout.hierarchical.enabled &&
    opA.physics.enabled === opB.physics.enabled &&
    opA.edges.hidden === opB.edges.hidden
  ) {
    return isEqual(a, b);
  }
  return isEqual(a, b) && opA === opB;
};

const MemoGraph = memo(VisNetwork, areEqual);

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
        const { __typename, color, label, isSource, ...data } = getNodeInfo(node);
        setNodeInfo({ x, y, data, isSource });
      },
      blurNode: () => setNodeInfo(undefined),
      hoverEdge: ({ event: { clientX: x, clientY: y }, edge }) => {
        const { from, to, ...rest } = getEdgeInfo(edge);
        const data = {
          startNode: getNodeInfo(from),
          stopNode: getNodeInfo(to),
          ...rest,
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
      {loading ? <Loading /> : <MemoGraph graph={data} options={options} events={events} />}
      {edgeInfo && <EdgeTooltip info={edgeInfo} />}
      {nodeInfo && <NodeTooltip info={nodeInfo} />}
    </Container>
  );
};
export default memo(NetworkGraph);
