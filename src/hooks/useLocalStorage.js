import { useEffect } from 'react';
import { setLsObjectItem } from '@utils';

const useLocalStorage = ({ value, key }) => {
  useEffect(() => {
    setLsObjectItem(key, value);
  }, [value, key]);
};

export default useLocalStorage;
