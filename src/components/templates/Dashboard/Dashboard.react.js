import React from 'react';
import tw from 'tailwind.macro';
import SEO from './SEO.react';
import styled from 'styled-components';
import { IconGraphql } from '@icons';
import { CONFIG_SERVER } from '@config';
import { mixins, GlobalStyle } from '@styles';
import { ArcGraph } from '@components';

const FixedRight = tw.div`fixed z-10 bottom-0 right-0 m-5`;

const Button = styled.a`
  ${mixins.button}
`;

const Dashboard = () => (
  <>
    <SEO title="Home" />
    <GlobalStyle />

    <FixedRight>
      <Button href={CONFIG_SERVER.url} target="_blank">
        <IconGraphql />
        <span>GraphQL Playground</span>
      </Button>
    </FixedRight>

    <ArcGraph />
  </>
);
export default Dashboard;
