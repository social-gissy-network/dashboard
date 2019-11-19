import React from 'react';
import { Dashboard, SEO } from '@components';
import { GlobalStyle } from '@styles';

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <GlobalStyle />
    <Dashboard />
  </>
);

export default IndexPage;
