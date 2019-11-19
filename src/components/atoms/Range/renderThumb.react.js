import { mixins, PALETTE } from '@styles';
import { grayscale, lighten } from 'polished';
import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const { PRIMARY } = PALETTE;
const grayColor = grayscale(PRIMARY);

const Container = styled.div`
  ${mixins.flexCenter}
  ${tw`h-10 w-10 bg-white`}
  box-shadow: 0px 2px 6px ${grayColor};
`;

const Tag = styled.div`
  ${tw`p-1 absolute font-bold text-sm font-bold rounded`}
  background-color: ${PRIMARY};
  color: ${lighten(0.5, PRIMARY)};
  top: -35px;
`;

const Thumb = styled.div`
  ${tw`h-5 w-1`};
  background-color: ${({ isDragged }) => (isDragged ? PRIMARY : grayColor)};
`;

const renderThumb = values => ({ index, props, isDragged }) => (
  <Container {...props}>
    <Tag>{values[index].toFixed(1)}</Tag>
    <Thumb isDragged={isDragged} />
  </Container>
);

export default renderThumb;
