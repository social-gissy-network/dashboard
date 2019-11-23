import React, { useState } from 'react';
import { SB_LABELS } from '@constants';
import Range from './Range.react';
import tw from 'tailwind.macro';

export default {
  title: `${SB_LABELS.ATOMS}Range`,
};

const options = [...Array(5).keys()].map(key => (
  <option key={key} value={key}>{`Option-${key}`}</option>
));

const Container = tw.div`m-20`;

export const Default = () => {
  const [value, setValue] = useState();
  return (
    <>
      <pre>{JSON.stringify(value, null, 2)}</pre>
      <Container>
        <Range onFinalChange={setValue}>{options}</Range>
      </Container>
    </>
  );
};
