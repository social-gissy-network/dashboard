import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Range as ReactRange } from 'react-range';
import Thumb from './Thumb.react';
import renderTrack from './renderTrack.react';

const STEP = 0.1;
const INITIAL = [0, 100];
const NOOP = () => {};

const Range = ({ initial = INITIAL, onChange: controlledChange = NOOP, onFinalChange = NOOP }) => {
  const [values, setValues] = useState(initial);

  useState(() => {
    onFinalChange(values);
  }, []);

  const [MIN, MAX] = initial;

  useEffect(() => {
    controlledChange(values);
  }, [values]);

  return (
    <ReactRange
      step={STEP}
      min={MIN}
      max={MAX}
      values={values}
      onChange={setValues}
      onFinalChange={onFinalChange}
      renderTrack={renderTrack({ values, MIN, MAX })}
      renderThumb={Thumb}
    />
  );
};

Range.propTypes = {
  initial: PropTypes.array,
  onChange: PropTypes.func,
  onFinalChange: PropTypes.func,
};

export default Range;
