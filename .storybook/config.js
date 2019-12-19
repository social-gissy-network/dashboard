import React from 'react';

import { configure, addParameters, addDecorator } from '@storybook/react';
import { create } from '@storybook/theming';

import '../src/styles/globals.css';
import GlobalStyle from '../src/styles/GlobalStyle.styles';
import GissyContext from '../src/store/GissyContext';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';
import { useDashboard } from '../src/hooks';
import {} from '../src/components';
import { ReusableProvider } from 'reusable';

const client = new ApolloClient({
  uri: `https://gissy-graphql.herokuapp.com/`,
  fetch,
});

const Wrapper = ({ children }) => {
  const store = useDashboard();

  return (
    <ApolloProvider client={client}>
      <GissyContext.Provider value={store}>
        <ReusableProvider>
          <GlobalStyle />
          {children}
        </ReusableProvider>
      </GissyContext.Provider>
    </ApolloProvider>
  );
};
addDecorator(S => (
  <Wrapper>
    <S />
  </Wrapper>
));

const theme = create({
  base: 'light',
  colorPrimary: 'hotpink',
  brandTitle: 'Gissy Storybook',
  brandUrl: 'https://docs.gissy.now.sh/README.html',
  brandImage:
    'https://user-images.githubusercontent.com/27515937/68681292-0f97f080-055b-11ea-86ba-6c791873dc9f.png',
});

addParameters({
  options: {
    showPanel: false,
    storySort: (a, b) => a[1].id.localeCompare(b[1].id),
    theme,
  },
});

configure(require.context('../src', true, /\.stories\.(js|mdx)$/), module);

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = '';
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action('NavigateTo:')(pathname);
};
