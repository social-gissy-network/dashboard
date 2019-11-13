import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import tw from 'tailwind.macro';

const Container = tw.div`
  p-6 bg-pink-200 rounded-lg shadow-2xl
`;

const Card = ({ children, className }, ref) => (
  <Container ref={ref} className={className}>
    {children}
  </Container>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default forwardRef(Card);
