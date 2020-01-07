import { Tooltip } from '@components';
import { PALETTE, Text } from '@styles';
import PropTypes from 'prop-types';
import React from 'react';

const DEFAULT = {
  x: undefined,
  y: undefined,
  data: {
    startNode: { name: 'Source' },
    stopNode: { name: 'Target' },
  },
};

const EdgeTooltip = ({ info = DEFAULT }) => {
  const { x, y, data = DEFAULT.data } = info;

  const {
    startNode: { name: source },
    stopNode: { name: target },
  } = data;

  return (
    <Tooltip pointer={{ x, y }}>
      <Text color={PALETTE.PRIMARY}>{source}</Text>
      <span> &#10230; </span>
      <Text color={PALETTE.SECONDARY}>{target}</Text>
    </Tooltip>
  );
};
EdgeTooltip.propTypes = {
  info: PropTypes.object.isRequired,
};

export default EdgeTooltip;
