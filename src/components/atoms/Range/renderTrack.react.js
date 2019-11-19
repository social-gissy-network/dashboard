import React from 'react';
import PropTypes from 'prop-types';
import { getTrackBackground } from 'react-range';
import { PALETTE } from '@styles';
import { grayscale } from 'polished';

const MIN = 0;
const MAX = 100;

const renderTrack = values => ({ props, children }) => (
  <div
    style={{
      ...props.style,
      height: '36px',
      display: 'flex',
      width: '100%',
    }}>
    <div
      ref={props.ref}
      style={{
        height: '5px',
        width: '100%',
        borderRadius: '2px',
        background: getTrackBackground({
          values,
          colors: [grayscale(PALETTE.PRIMARY), PALETTE.PRIMARY, grayscale(PALETTE.PRIMARY)],
          min: MIN,
          max: MAX,
        }),
        alignSelf: 'center',
      }}>
      {children}
    </div>
  </div>
);

renderTrack.propTypes = {
  children: PropTypes.node.isRequired,
};

export default renderTrack;
