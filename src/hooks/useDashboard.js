import { CONFIG_DEFAULT } from '@config';
import { LOCAL_STORAGE_KEYS, STORE } from '@constants';
import { useLocalStorage } from '@hooks';
import { formToController } from '@utils';
import isEqual from 'lodash.isequal';
import { useCallback, useRef, useState } from 'react';

const { CONTROLLER } = STORE;

const useDashboard = () => {
  const [controller, setController] = useState(CONFIG_DEFAULT);

  const form = useRef(CONFIG_DEFAULT);

  useLocalStorage({ value: controller, key: LOCAL_STORAGE_KEYS.CONTROLLER });

  const setFromForm = useCallback(props => {
    if (!isEqual(form.current, props)) {
      form.current = props;
      setController(formToController(form.current));
    }
  }, []);

  const store = {
    [CONTROLLER]: { value: controller, set: setController },
    setFromForm,
  };

  return store;
};

export default useDashboard;
