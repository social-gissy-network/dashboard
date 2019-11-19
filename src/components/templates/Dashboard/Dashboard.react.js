import { ArcGraph, Menu, Range } from '@components';
import { CONFIG_SERVER, CONFIG_MAP } from '@config';
import { IconGraphql } from '@icons';
import { mixins } from '@styles';
import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const FixedRight = tw.div`fixed z-10 top-0 right-0 m-5`;
const FixedLeft = tw.div`fixed z-10 top-0 left-0 m-5`;

const FixedBottom = styled.div`
  ${mixins.flexCenter};
  ${tw`w-full fixed z-10 bottom-0 w-full`}
`;

const RangeSize = tw.div`w-1/3`;

const Button = styled.a`
  ${mixins.button}
`;

const [defaultMapStyle] = CONFIG_MAP.MAP_STYLE;

const Dashboard = () => {
  const [mapStyle, setMapStyle] = useState(defaultMapStyle);
  const onMenuSubmit = ({ mapStyle }) => setMapStyle(mapStyle);

  return (
    <>
      <ArcGraph mapStyle={mapStyle} />

      <FixedLeft>
        <Menu mapStyle={mapStyle} onSubmit={onMenuSubmit} />
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
    </>
  );
};
export default Dashboard;
