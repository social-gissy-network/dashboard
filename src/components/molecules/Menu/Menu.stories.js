import React, { useState } from 'react';
import { SB_LABELS } from '@constants';
import Menu from './Menu.react';

export default {
  title: `${SB_LABELS.MOLECULES}Menu`,
};

export const Default = () => {
  const [value, setValue] = useState();
  return (
    <>
      <pre>{JSON.stringify(value, null, 2)}</pre>
      <Menu onSubmit={setValue}>Some Text</Menu>
    </>
  );
};
