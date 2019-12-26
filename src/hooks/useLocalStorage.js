import { useEffect } from 'react';
import { LOCAL_STORAGE_KEYS } from '@constants';
import { setLsObjectItem } from '@utils';

const { CONTROLLER } = LOCAL_STORAGE_KEYS;

const useLocalStorage = ({ controller }) => {
  useEffect(() => {
    setLsObjectItem(CONTROLLER, controller);
  }, [controller]);
};

export default useLocalStorage;
