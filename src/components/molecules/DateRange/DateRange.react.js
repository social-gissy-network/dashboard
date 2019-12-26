import { Range } from '@components';
import React, { useState } from 'react';
import { mixins } from '@styles';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { useTimeRange } from '@hooks';
import { unixTimeToDate } from '@utils';

const Tag = styled.div`
  width: max-content;
  ${mixins.box}
`;

const Container = styled.div`
  ${tw`pb-5 w-full`}
`;

const RangeWrapper = styled.div`
  ${tw`px-1`}
`;

const Tags = styled.div`
  ${mixins.flexBetween}
`;

const DateRange = () => {
  const [initial, onFinalChange] = useTimeRange();
  const [[left, right], setValues] = useState(initial);
  return (
    <Container>
      <Tags>
        <Tag>{unixTimeToDate(left)}</Tag>
        <Tag>{unixTimeToDate(right)}</Tag>
      </Tags>
      <br />
      <RangeWrapper>
        <Range initial={initial} onFinalChange={onFinalChange} onChange={setValues} />
      </RangeWrapper>
    </Container>
  );
};

export default DateRange;
