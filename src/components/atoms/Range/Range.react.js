import { NOOP } from '@constants';
import PropTypes from 'prop-types';
import 'rc-slider/assets/index.css';
import RcRange from 'rc-slider/lib/Range';
import React, { useEffect, useState } from 'react';

const STEP = 0.1;
const INITIAL = [0, 100];

const Range = ({ initial = INITIAL, onChange: controlledChange = NOOP, onFinalChange = NOOP }) => {
  const [values, setValues] = useState(initial);

  useState(() => {
    onFinalChange(values);
  }, []);

  useEffect(() => {
    controlledChange(values);
  }, [controlledChange, values]);

  const [min, max] = initial;

  return (
    <RcRange
      defaultValue={initial}
      min={min}
      max={max}
      allowCross={false}
      value={values}
      step={STEP}
      onChange={setValues}
      onAfterChange={onFinalChange}
    />
  );
};

Range.propTypes = {
  initial: PropTypes.array,
  onChange: PropTypes.func,
  onFinalChange: PropTypes.func,
};

export default Range;
