import { ArcGraph, Menu, Range } from '@components';
import { CONFIG_SERVER, CONFIG_MAP } from '@config';
import { IconGraphql } from '@icons';
import { mixins } from '@styles';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { GissyContext } from '@store';
import { getLSItem, LOCAL_STORAGE_KEYS, setLSItem } from '@utils';

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

  useEffect(() => {
    setLSItem(LOCAL_STORAGE_KEYS.MAP_STYLE, mapStyle);
  }, [mapStyle]);

  const store = {
    TIME: { timeRange, setTimeRange },
    STYLE: { mapStyle, setMapStyle },
  };

  return (
    <GissyContext.Provider value={store}>
      <ArcGraph />

      <FixedLeft>
        <Menu onSubmit={setMapStyle} />
      </FixedLeft>

      <FixedRight>
        <Button href={CONFIG_SERVER.url} target="_blank">
          <IconGraphql />
          <span>Server</span>
        </Button>
      </FixedRight>
      <FixedBottom>
        <RangeSize>
          <Range onFinalChange={setTimeRange} />
        </RangeSize>
      </FixedBottom>
    </GissyContext.Provider>
  );
};
export default Dashboard;
