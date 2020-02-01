import { Tooltip } from '@components';
import { PALETTE, Text } from '@styles';
import PropTypes from 'prop-types';
import React from 'react';

const DEFAULT = {
  x: undefined,
  y: undefined,
  data: { name: 'Source' },
  isSource: true,
};

const { PRIMARY, SECONDARY } = PALETTE;

const NodeTooltip = ({ info = DEFAULT }) => {
  const { x, y, data = DEFAULT.data, isSource } = info;

  const { name, ...rest } = data;

  return (
    <Tooltip pointer={{ x, y }}>
      <div>
        <Text strong>Name: </Text>
        <Text color={isSource ? PRIMARY : SECONDARY}>{name}</Text>
      </div>
      {Object.entries(rest).map(([key, value]) => (
        <div key={key}>
          <Text strong>{`${key}: `}</Text>
          <Text>{`${value}`}</Text>
        </div>
      ))}
    </Tooltip>
  );
};
NodeTooltip.propTypes = {
  info: PropTypes.object.isRequired,
};

export default NodeTooltip;
