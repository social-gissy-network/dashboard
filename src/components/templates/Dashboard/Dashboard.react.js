import { Menu, NetworkGraph, ArcGraph, NodeInfo } from '@components';
import { CONFIG_SERVER, CONFIG_GRAPH } from '@config';
import { IconGraphql } from '@icons';
import { GissyContext } from '@store';
import { mixins } from '@styles';
import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { useDashboard } from '@hooks';
import { ReusableProvider } from 'reusable';

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

const Button = styled.a`
  ${mixins.button}
`;

const Display = styled.div`
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`;

const { TYPES } = CONFIG_GRAPH;

const Dashboard = () => {
  const store = useDashboard();
  return (
    <GissyContext.Provider value={store}>
      <ReusableProvider>
        <Display visible={store.GRAPH_TYPE.value === TYPES.ARC}>
          <ArcGraph />
        </Display>
        <Display visible={store.GRAPH_TYPE.value === TYPES.NETWORK}>
          <NetworkGraph />
        </Display>
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
      </ReusableProvider>
    </GissyContext.Provider>
  );
};

export default Dashboard;
