import { useState, useCallback, useRef } from 'react';
import { CONFIG_DEFAULT } from '@config';
import { useDebounce, useLocalStorage } from '@hooks';
import { formToController } from '@utils';
import { STORE, LOCAL_STORAGE_KEYS } from '@constants';
import isEqual from 'lodash.isequal';

const { SELECTED_NODES, CONTROLLER, LIMIT, PATH_LENGTH } = STORE;

const {
  [SELECTED_NODES]: DEFAULT_SELECTED_NODES,
  CONTROLLER: { ...DEFAULT_CONTROLLER },
} = CONFIG_DEFAULT;

const useDashboard = () => {
  const [selectedNodes, setSelectedNodes] = useState(DEFAULT_SELECTED_NODES);
  const [controller, setController] = useState(DEFAULT_CONTROLLER);

  const form = useRef(DEFAULT_CONTROLLER);

  useLocalStorage({ value: controller, key: LOCAL_STORAGE_KEYS.CONTROLLER });

  const setFromForm = useCallback(props => {
    if (!isEqual(form.current, props)) {
      form.current = props;
      setController(formToController(form.current));
    }
  }, []);

  const limit = useDebounce(controller[LIMIT]);
  const length = useDebounce(controller[PATH_LENGTH]);

  const debounced = {
    ...controller,
    [LIMIT]: limit,
    [PATH_LENGTH]: length,
  };

  const store = {
    [SELECTED_NODES]: { value: selectedNodes, set: setSelectedNodes },
    [CONTROLLER]: { value: debounced, set: setFromForm },
  };

  return store;
};

export default useDashboard;
