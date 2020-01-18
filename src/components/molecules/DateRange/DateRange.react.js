import { Range } from '@components';
import { useTimeRange } from '@hooks';
import { mixins } from '@styles';
import { unixTimeToDate } from '@utils';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const Tag = styled.div`
  width: max-content;
  ${mixins.box}
`;

const RangeWrapper = styled.div`
  ${tw`px-1`}
`;

const Container = styled.div`
  ${tw`pb-5 w-full`}
  ${RangeWrapper} {
    ${tw`mt-3`}
  }
`;

const Tags = styled.div`
  ${mixins.flexBetween}
`;

const NOOP = () => {};

const DateRange = ({ onChange = NOOP }) => {
  const [initial] = useTimeRange();
  const [range, setRange] = useState([initial]);

  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      setTimeout(() => {
        onChange(range);
      }, 1000);
      isFirstLoad.current = false;
    } else {
      onChange(range);
    }
  }, [range, onChange]);

  const [left, right] = range;

  return (
    <Container>
      <Tags>
        <Tag>{unixTimeToDate(left)}</Tag>
        <Tag>{unixTimeToDate(right)}</Tag>
      </Tags>
      <RangeWrapper>
        <Range initial={initial} onChange={setRange} />
      </RangeWrapper>
    </Container>
  );
};

DateRange.propTypes = {
  onChange: PropTypes.func,
};

export default DateRange;
