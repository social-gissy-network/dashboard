import { mixins, COLORS } from '@styles';
import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import PropTypes from 'prop-types';

const { DARK_GREY, GREY } = COLORS;

const Container = styled.div`
  ${mixins.flexCenter}
  ${tw`shadow-md`}
`;

const Box = styled.div`
  ${tw`h-6 w-2`};
  background-color: ${({ isDragged }) => (isDragged ? DARK_GREY : GREY)};
`;

const Thumb = ({ props: injectedProps, isDragged }) => (
  <Container {...injectedProps}>
    <Box isDragged={isDragged} />
  </Container>
);

Thumb.propTypes = {
  props: PropTypes.object.isRequired,
  isDragged: PropTypes.bool.isRequired,
};

export default Thumb;
