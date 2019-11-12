import React, { forwardRef } from 'react';
import tw from 'tailwind.macro';

const Container = tw.div`
  p-6 bg-pink-200 rounded-lg shadow-2xl
`;

const Card = forwardRef(({ children }, ref) => <Container ref={ref}>{children}</Container>);

export default Card;
