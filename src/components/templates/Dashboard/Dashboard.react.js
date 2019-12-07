import { ArcGraph, Menu, Range } from '@components';
import { CONFIG_SERVER } from '@config';
import { IconGraphql } from '@icons';
import { GissyContext } from '@store';
import { mixins } from '@styles';
import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { useDashboard } from '@hooks';

const FixedRight = tw.div`fixed z-10 top-0 right-0 m-5`;
const FixedLeft = tw.div`fixed z-10 top-0 left-0 m-5`;

const FixedBottom = styled.div`
  ${mixins.flexCenter};
  ${tw`w-full fixed z-10 bottom-0`}
`;

const RangeSize = tw.div`w-1/3`;

const Button = styled.a`
  ${mixins.button}
`;

const Dashboard = () => {
  const store = useDashboard();
  return (
    <GissyContext.Provider value={store}>
      <ArcGraph />
      <FixedLeft>
        <Menu />
      </FixedLeft>
      <FixedRight>
        <Button href={CONFIG_SERVER.url} target="_blank">
          <IconGraphql />
          <span>Server</span>
        </Button>
      </FixedRight>
      <FixedBottom>
        <RangeSize>
          <Range />
        </RangeSize>
      </FixedBottom>
    </GissyContext.Provider>
  );
};

export default Dashboard;
