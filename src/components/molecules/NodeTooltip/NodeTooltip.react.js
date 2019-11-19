import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@components';
import { Text, PALETTE } from '@styles';

const NodeTooltip = ({ info }) => {
  const {
    isSource = true,
    x = undefined,
    y = undefined,
    data: {
      startNode: { name: source },
      stopNode: { name: target },
    },
  } = info;

  return (
    <Tooltip pointer={{ x, y }}>
      <span>{`${isSource ? `Source` : `Target`}: `} </span>
      <Text color={isSource ? PALETTE.PRIMARY : PALETTE.SECONDARY}>
        {isSource ? source : target}
      </Text>
    </Tooltip>
  );
};
NodeTooltip.propTypes = {
  info: PropTypes.object.isRequired,
};

export default NodeTooltip;
