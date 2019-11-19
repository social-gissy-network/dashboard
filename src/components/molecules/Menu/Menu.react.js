import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import tw from 'tailwind.macro';

const Container = tw.div`
  p-2 rounded-lg shadow-2xl border-black bg-white
`;

const Menu = ({ children, className }, ref) => (
  <Container ref={ref} className={className}>
    {children}
  </Container>
);

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default forwardRef(Menu);
