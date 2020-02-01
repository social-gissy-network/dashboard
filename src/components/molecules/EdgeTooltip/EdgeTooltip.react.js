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
    /* eslint-disable no-unused-vars */
    __typename: unused,
    ...rest
  } = data;

  return (
    <Tooltip pointer={{ x, y }}>
      <div>
        <Text strong>From: </Text>
        <Text color={PALETTE.PRIMARY}>{source}</Text>
      </div>
      <div>
        <Text strong>To: </Text>
        <Text color={PALETTE.SECONDARY}>{target}</Text>
      </div>
      <Text>
        {Object.entries(rest).map(([key, value]) => (
          <div key={key}>
            <Text strong>{`${key}: `}</Text>
            <Text>{`${value}`}</Text>
          </div>
        ))}
      </Text>
    </Tooltip>
  );
};
EdgeTooltip.propTypes = {
  info: PropTypes.object.isRequired,
};

export default EdgeTooltip;
