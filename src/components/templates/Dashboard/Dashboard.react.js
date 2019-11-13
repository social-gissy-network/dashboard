import { NetworkGraph } from '@components';
import React from 'react';
import tw from 'tailwind.macro';
import SEO from './SEO.react';
import styled from 'styled-components';
import { IconGraphql } from '@icons';
import { SERVER } from '@config';

const Wrapper = tw.div`flex m-5 items-start flex-row h-screen bg-gray-200`;

const Button = styled.a`
  svg {
    margin-right: 10px;
    width: 2em;
  }
  ${tw`z-50 flex justify-around items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow`}
`;

const Dashboard = () => (
  <>
    <SEO title="Home" />

    <Wrapper>
      <Button href={SERVER.url} target="_blank">
        <IconGraphql />
        <span>GraphQL Playground</span>
      </Button>
    </Wrapper>

    <NetworkGraph />
  </>
);
export default Dashboard;
