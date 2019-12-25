import { Graph, Menu } from '@components';
import { CONFIG_SERVER } from '@config';
import { useDashboard } from '@hooks';
import { IconGraphql } from '@icons';
import { GissyContext } from '@store';
import { mixins } from '@styles';
import React from 'react';
import { ReusableProvider } from 'reusable';
import styled from 'styled-components';
import tw from 'tailwind.macro';

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

const Button = styled.a`
  ${mixins.button}
`;

const Dashboard = () => {
  const store = useDashboard();

  return (
    <GissyContext.Provider value={store}>
      <ReusableProvider>
        <Graph />
        <FixedLeftTop>
          <Menu />
        </FixedLeftTop>
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
