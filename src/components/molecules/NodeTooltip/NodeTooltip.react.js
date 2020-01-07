import { Tooltip } from '@components';
import { Text } from '@styles';
import PropTypes from 'prop-types';
import React from 'react';

const DEFAULT = {
  x: undefined,
  y: undefined,
  data: {},
};

const NodeTooltip = ({ info = DEFAULT }) => {
  const { x, y, data = DEFAULT.data } = info;

  return (
    <Tooltip pointer={{ x, y }}>
      <Text>
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <Text strong>{`${key}: `}</Text>
            <Text>{`${value}`}</Text>
          </div>
        ))}
      </Text>
    </Tooltip>
  );
};
NodeTooltip.propTypes = {
  info: PropTypes.object.isRequired,
};

export default NodeTooltip;
