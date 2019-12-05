import React, { useState } from 'react';

import { configure, addParameters, addDecorator } from '@storybook/react';
import { create } from '@storybook/theming';

import '../src/styles/globals.css';
import GlobalStyle from '../src/styles/GlobalStyle.styles';
import GissyContext from '../src/store/GissyContext';
import CONFIG_MAP from '../src/config/map';
import LOCAL_STORAGE_KEYS from '../src/constants/localStorage';
import { getLSItem } from '../src/utils/localStorage';
import { useTimeRange } from '../src/hooks/index';
import { unixToDbTime } from '../src/utils/index';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';

const client = new ApolloClient({
  uri: `https://gissy-graphql.herokuapp.com/`,
  fetch,
});

const defaultMapStyle = getLSItem(LOCAL_STORAGE_KEYS.MAP_STYLE) || CONFIG_MAP.DEFAULT_MAP_STYLE;

const Wrapper = ({ children }) => {
  const [mapStyle, setMapStyle] = useState(defaultMapStyle);
  const [timeRange, setTimeRange] = useState([0, Infinity]);

  const [limit, setLimit] = useState(50);
  const store = {
    TIME: { timeRange, setTimeRange },
    STYLE: { mapStyle, setMapStyle },
    LIMIT: { limit, setLimit },
  };

  return (
    <ApolloProvider client={client}>
      <GissyContext.Provider value={store}>
        <GlobalStyle />
        {children}
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
