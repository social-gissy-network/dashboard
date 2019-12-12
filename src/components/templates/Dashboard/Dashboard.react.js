import { Menu, Range, NetworkGraph, ArcGraph, NodeInfo } from '@components';
import { CONFIG_SERVER, CONFIG_GRAPH } from '@config';
import { IconGraphql } from '@icons';
import { GissyContext } from '@store';
import { mixins } from '@styles';
import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { useDashboard } from '@hooks';

const FixedTop = styled.div`
  ${mixins.fixed}
  ${tw`top-0`}
`;

const FixedLeftTop = styled(FixedTop)`
  ${tw`left-0`}
`;
const FixedTopRight = styled(FixedTop)`
  ${tw`right-0`}
`;

const FixedBottomLeft = styled.div`
  ${mixins.fixed}
  ${tw`left-0`}
  bottom: 100px;
`;

const FixedBottom = styled.div`
  ${mixins.flexCenter};
  ${tw`w-full fixed z-10 bottom-0`}
`;

const RangeSize = tw.div`w-1/3`;

const Button = styled.a`
  ${mixins.button}
`;

const { TYPES } = CONFIG_GRAPH;

const GRAPHS = {
  [TYPES.ARC]: <ArcGraph />,
  [TYPES.NETWORK]: <NetworkGraph />,
};

const Dashboard = () => {
  const store = useDashboard();
  return (
    <GissyContext.Provider value={store}>
      {GRAPHS[store.GRAPH_TYPE.value]}
      <FixedLeftTop>
        <Menu />
      </FixedLeftTop>
      <FixedBottomLeft>
        <NodeInfo />
      </FixedBottomLeft>
      <FixedTopRight>
        <Button href={CONFIG_SERVER.url} target="_blank">
          <IconGraphql />
          <span>Server</span>
        </Button>
      </FixedTopRight>
      <FixedBottom>
        <RangeSize>
          <Range />
        </RangeSize>
      </FixedBottom>
    </GissyContext.Provider>
  );
};

export default Dashboard;
