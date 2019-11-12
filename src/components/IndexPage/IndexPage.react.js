import React from 'react';
import tw from 'tailwind.macro';
import SEO from '../seo';
import { NodesJSON } from '@components';

const Wrapper = tw.div`flex items-center justify-center flex-col h-screen bg-gray-200`;

const Main = tw.div`
  p-6 bg-pink-200 rounded-lg shadow-2xl
`;

const IndexPage = () => (
  <Wrapper>
    <SEO title="Home" />
    <Main>
      <NodesJSON />
    </Main>
  </Wrapper>
);

export default IndexPage;
