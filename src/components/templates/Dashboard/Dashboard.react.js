import React from 'react';
import tw from 'tailwind.macro';
import SEO from './SEO.react';
import styled from 'styled-components';
import { IconGraphql } from '@icons';
import { CONFIG_SERVER } from '@config';
import { mixins, GlobalStyle } from '@styles';
import { ArcGraph, Range } from '@components';

const FixedRight = tw.div`fixed z-10 top-0 right-0 m-5`;

const FixedBottom = styled.div`
  ${mixins.flexCenter};
  ${tw`w-full fixed z-10 bottom-0 w-full`}
`;

const RangeSize = tw.div`w-1/3`;

const Button = styled.a`
  ${mixins.button}
`;

const Dashboard = () => (
  <>
    <SEO title="Home" />
    <GlobalStyle />

    <ArcGraph />

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
  </>
);
export default Dashboard;
