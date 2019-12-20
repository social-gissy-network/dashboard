import { COLORS, mixins } from '@styles';
import PropTypes from 'prop-types';
import React from 'react';
import { getTrackBackground } from 'react-range';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { lighten } from 'polished';

const Container = styled.div`
  ${mixins.flexCenter}
`;

const { GREY } = COLORS;

const Track = styled.div`
  ${tw`h-1 w-full`};
  background: ${({ background }) => background};
`;

const renderTrack = ({ values, MIN, MAX }) => ({ children, props }) => {
  const background = getTrackBackground({
    values,
    colors: [lighten(0.1, GREY), GREY, lighten(0.1, GREY)],
    min: MIN,
    max: MAX,
  });
  return (
    <Container>
      <Track ref={props.ref} background={background}>
        {children}
      </Track>
    </Container>
  );
};

renderTrack.propTypes = {
  children: PropTypes.node.isRequired,
};

export default renderTrack;
