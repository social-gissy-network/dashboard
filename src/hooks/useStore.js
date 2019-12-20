import { useContext } from 'react';
import { GissyContext } from '@store';

const useStore = () => {
  const context = useContext(GissyContext);
  return context;
};

export default useStore;
