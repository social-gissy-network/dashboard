import { NodesJSON, Graph, Card } from '@components';
import React from 'react';
import tw from 'tailwind.macro';
import SEO from './SEO.react';
import styled from 'styled-components';
import { IconGraphql } from '@icons';
import { SERVER } from '@config';

const Wrapper = tw.div`flex items-center justify-around flex-col h-screen bg-gray-200`;
const Main = tw.div`p-6 bg-pink-200 rounded-lg shadow-2xl w-2/3`;

const WhiteCard = styled.div`
  ${tw`bg-pink-100`}
`;

const Button = styled.a`
  svg {
    margin-right: 10px;
    width: 2em;
  }
  ${tw`flex justify-around items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow`}
`;

const Dashboard = () => (
  <Wrapper>
    <SEO title="Home" />
    <Button href={SERVER.url} target="_blank">
      <IconGraphql />
      <span>GraphQL Playground</span>
    </Button>

    <Main>
      <WhiteCard>
        <Graph />
      </WhiteCard>
    </Main>
    <Card>
      <h1>All Nodes Query</h1>
      <NodesJSON />
    </Card>
  </Wrapper>
);
export default Dashboard;
