import { useTimeRange } from '@hooks';
import React, { useState } from 'react';
import { Range as ReactRange } from 'react-range';
import tw from 'tailwind.macro';
import renderThumb from './renderThumb.react';
import renderTrack from './renderTrack.react';

const STEP = 0.1;

const Container = tw.div`pb-10`;

const Range = () => {
  const [initial, onFinalChange] = useTimeRange();
  const [values, setValues] = useState(initial);

  useState(() => {
    onFinalChange(values);
  }, []);

  const [MIN, MAX] = initial;

  return (
    <Container>
      <ReactRange
        step={STEP}
        min={MIN}
        max={MAX}
        values={values}
        onChange={setValues}
        onFinalChange={onFinalChange}
        renderTrack={renderTrack({ values, MIN, MAX })}
        renderThumb={renderThumb(values)}
      />
    </Container>
  );
};

export default Range;
