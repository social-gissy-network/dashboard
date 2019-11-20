import React from 'react';
import PropTypes from 'prop-types';
import tw from 'tailwind.macro';

const Container = tw.div`
  p-2 rounded-lg shadow-2xl border-black bg-white
`;

const Card = ({ children, className }) => <Container className={className}>{children}</Container>;

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
