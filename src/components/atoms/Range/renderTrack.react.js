import React from 'react';
import PropTypes from 'prop-types';
import { getTrackBackground } from 'react-range';
import { PALETTE, mixins } from '@styles';
import { grayscale } from 'polished';
import tw from 'tailwind.macro';
import styled from 'styled-components';

const Container = styled.div`
  ${mixins.flexCenter}
`;

const Track = styled.div`
  ${tw`h-1 w-full`};
  background: ${({ background }) => background};
`;

const renderTrack = ({ values, MIN, MAX }) => ({ children, props }) => {
  const background = getTrackBackground({
    values,
    colors: [grayscale(PALETTE.PRIMARY), PALETTE.PRIMARY, grayscale(PALETTE.PRIMARY)],
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
