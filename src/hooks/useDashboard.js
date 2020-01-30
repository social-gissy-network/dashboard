import { CONFIG_DEFAULT, MODES } from '@config';
import { LOCAL_STORAGE_KEYS, STORE } from '@constants';
import { formToController } from '@utils';
import isEqual from 'lodash.isequal';
import { useCallback, useRef, useState } from 'react';
import useLocalStorage from './useLocalStorage';
import useStaticTimeRange from './useStaticTimeRange';

const { CONTROLLER, SELECTED_NODES, MODE, TIME_RANGE } = STORE;

const useDashboard = () => {
  const time = useStaticTimeRange();
  const [controller, setController] = useState({ ...CONFIG_DEFAULT, [TIME_RANGE]: time });
  const [isSubmit, setSubmit] = useState(true);

  const form = useRef(CONFIG_DEFAULT);

  useLocalStorage({ value: controller, key: LOCAL_STORAGE_KEYS.CONTROLLER });

  const setFromForm = useCallback(props => {
    if (!isEqual(form.current, props)) {
      form.current = props;
      const newController = formToController(form.current);
      const { [SELECTED_NODES]: selected, [MODE]: mode } = newController;
      const isPathMode = mode === MODES.path;
      setController({ ...newController, [SELECTED_NODES]: isPathMode ? selected : [] });
      setSubmit(true);
    }
  }, []);

  const store = {
    [CONTROLLER]: { value: controller, set: setController },
    submit: { value: isSubmit, set: setSubmit },
    setFromForm,
  };

  return store;
};

export default useDashboard;
