import React, { useState } from 'react';
import tw from 'tailwind.macro';
import { Range as ReactRange } from 'react-range';

import renderTrack from './renderTrack.react';
import renderThumb from './renderThumb.react';
import styled from 'styled-components';
import { useTimeRange } from '@hooks';

const Container = styled.div`
  ${tw`m-10`};
`;

const STEP = 0.1;

const Range = () => {
  const [MIN, MAX] = useTimeRange();
  const [values, setValues] = useState([MIN, MAX]);

  return (
    <Container>
      <ReactRange
        step={STEP}
        min={MIN}
        max={MAX}
        values={values}
        onChange={setValues}
        renderTrack={renderTrack({ values, MIN, MAX })}
        renderThumb={renderThumb(values)}
      />
    </Container>
  );
};

export default Range;
