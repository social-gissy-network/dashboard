import { mixins, PALETTE } from '@styles';
import { grayscale, lighten } from 'polished';
import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const { PRIMARY } = PALETTE;
const grayColor = grayscale(PRIMARY);

const Container = styled.div`
  ${mixins.flexCenter}
  ${tw`shadow-md`}
`;

const Tag = styled.div`
  ${tw`p-1 absolute font-bold text-sm font-bold rounded`}
  background-color: ${PRIMARY};
  color: ${lighten(0.5, PRIMARY)};
  top: -35px;
`;

const Thumb = styled.div`
  ${tw`h-6 w-2`};
  background-color: ${({ isDragged }) => (isDragged ? grayColor : PRIMARY)};
`;

const renderThumb = values => ({ index, props, isDragged }) => (
  <Container {...props}>
    <Tag>{values[index].toFixed(1)}</Tag>
    <Thumb isDragged={isDragged} />
  </Container>
);

export default renderThumb;
