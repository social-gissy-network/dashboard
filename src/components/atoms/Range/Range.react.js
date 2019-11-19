import React, { useState } from 'react';
import PropTypes from 'prop-types';
import tw from 'tailwind.macro';
import { Range as ReactRange } from 'react-range';
import { Card } from '@components';

import renderTrack from './renderTrack.react';
import renderThumb from './renderThumb.react';

const Container = tw.div`m-10`;

const STEP = 0.1;
const MIN = 0;
const MAX = 100;

const Range = ({ values: initialValues = [MIN, MAX] }) => {
  const [values, setValues] = useState(initialValues);
  return (
    <Card>
      <Container>
        <ReactRange
          step={STEP}
          min={MIN}
          max={MAX}
          values={values}
          onChange={setValues}
          renderTrack={renderTrack(values)}
          renderThumb={renderThumb(values)}
        />
      </Container>
    </Card>
  );
};

Range.propTypes = {
  values: PropTypes.array.isRequired,
};

export default Range;
