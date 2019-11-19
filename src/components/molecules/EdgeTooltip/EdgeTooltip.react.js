import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@components';
import { Text, PALETTE } from '@styles';

const EdgeTooltip = ({ info }) => {
  const {
    x = undefined,
    y = undefined,
    data: {
      startNode: { name: source },
      stopNode: { name: target },
    },
  } = info;
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
