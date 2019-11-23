import { ArcGraph, Menu, Range } from '@components';
import { CONFIG_MAP, CONFIG_SERVER } from '@config';
import { LOCAL_STORAGE_KEYS } from '@constants';
import { IconGraphql } from '@icons';
import { GissyContext } from '@store';
import { mixins } from '@styles';
import { getLSItem, setLSItem } from '@utils';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

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

const defaultMapStyle = getLSItem(LOCAL_STORAGE_KEYS.MAP_STYLE) || CONFIG_MAP.DEFAULT_MAP_STYLE;

const Dashboard = () => {
  const [mapStyle, setMapStyle] = useState(defaultMapStyle);
  const [timeRange, setTimeRange] = useState([0, 100]);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    setLSItem(LOCAL_STORAGE_KEYS.MAP_STYLE, mapStyle);
  }, [mapStyle]);

  const store = {
    TIME: { timeRange, setTimeRange },
    STYLE: { mapStyle, setMapStyle },
    LIMIT: { limit, setLimit },
  };

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
