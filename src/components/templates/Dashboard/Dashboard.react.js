import { NetworkGraph } from '@components';
import React from 'react';
import tw from 'tailwind.macro';
import SEO from './SEO.react';
import styled from 'styled-components';
import { IconGraphql } from '@icons';
import { SERVER } from '@config';
import { mixins } from '@styles';

const FixedRight = tw.div`fixed z-10 bottom-0 right-0 m-5`;

const Button = styled.a`
  ${mixins.button}
`;

const Dashboard = () => (
  <>
    <SEO title="Home" />

    <FixedRight>
      <Button href={SERVER.url} target="_blank">
        <IconGraphql />
        <span>GraphQL Playground</span>
      </Button>
    </FixedRight>

    <NetworkGraph />
  </>
);
export default Dashboard;
