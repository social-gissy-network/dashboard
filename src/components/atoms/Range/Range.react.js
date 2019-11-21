import { useTimeRange } from '@hooks';
import React, { useState } from 'react';
import { Range as ReactRange } from 'react-range';
import tw from 'tailwind.macro';
import renderThumb from './renderThumb.react';
import renderTrack from './renderTrack.react';

const Container = tw.div`m-10`;

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
