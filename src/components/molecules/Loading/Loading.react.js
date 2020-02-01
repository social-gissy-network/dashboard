import { IconLogo } from '@icons';
import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const Container = styled.div`
  ${tw`w-1/12`}
  animation: blink 5s ease-in infinite;
  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const Loading = () => (
  <Container>
    <IconLogo />
  </Container>
);

export default Loading;
