import { useContext } from 'react';
import { GissyContext } from '@store';
import { createStore } from 'reusable';

const useStore = () => {
  const context = useContext(GissyContext);
  return context;
};

export default createStore(useStore);
