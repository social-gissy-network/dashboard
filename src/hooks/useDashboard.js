import { useState, useCallback, useRef } from 'react';
import { CONFIG_DEFAULT } from '@config';
import { useDebounce, useLocalStorage } from '@hooks';
import { toBoolean } from '@utils';
import { STORE } from '@constants';
import isEqual from 'lodash.isequal';

const {
  SELECTED_NODES,
  TIME_RANGE,
  CONTROLLER,
  LIMIT,
  PATH_LENGTH,
  IS_EDGES_VISIBLE,
  IS_HIERARCHICAL_VIEW,
  IS_PATH_CALCULATION,
} = STORE;

const {
  CONTROLLER: { [TIME_RANGE]: DEFAULT_TIME_RANGE, [SELECTED_NODES]: DEFAULT_SELECTED_NODES },
} = CONFIG_DEFAULT;

const NUMBERS = [LIMIT, PATH_LENGTH];
const BOOLEANS = [IS_HIERARCHICAL_VIEW, IS_EDGES_VISIBLE, IS_PATH_CALCULATION];

const formToController = form => {
  const mapped = Object.entries(form).map(([key, value]) => [
    key,
    NUMBERS.includes(key) ? Number(value) : BOOLEANS.includes(value) ? toBoolean(value) : value,
  ]);

  return Object.fromEntries(mapped);
};

const useDashboard = () => {
  const [timeRange, setTimeRange] = useState(DEFAULT_TIME_RANGE);
  const [selectedNodes, setSelectedNodes] = useState(DEFAULT_SELECTED_NODES);
  const [controller, setController] = useState(CONFIG_DEFAULT);

  const form = useRef();

  useLocalStorage({ controller });

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
    [TIME_RANGE]: { value: timeRange, set: setTimeRange },
    [SELECTED_NODES]: { value: selectedNodes, set: setSelectedNodes },
    [CONTROLLER]: { value: debounced, set: setFromForm },
  };

  return store;
};

export default useDashboard;
