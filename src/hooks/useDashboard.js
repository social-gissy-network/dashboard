import { useState, useCallback, useRef, useEffect } from 'react';
import { CONFIG_DEFAULT } from '@config';
import { useDebounce, useLocalStorage } from '@hooks';
import { toBoolean } from '@utils';
import { STORE } from '@constants';
import isEqual from 'lodash.isequal';

const {
  MAP_STYLE: DEFAULT_STYLE,
  GRAPH_TYPE: DEFAULT_GRAPH,
  LIMIT: DEFAULT_LIMIT,
  NETWORK_OPTIONS: DEFAULT_NETWORK,
  IS_EDGES_VISIBLE: DEFAULT_EDGES_VISIBLE,
  IS_PATH_CALCULATION: DEFAULT_PATH_CALCULATION,
} = CONFIG_DEFAULT;

const DEFAULT_SELECTED = [];
const DEFAULT_RANGE = [0, Infinity];

const {
  GRAPH_TYPE: STORE_GRAPH,
  IS_EDGES_VISIBLE: STORE_EDGES,
  LIMIT: STORE_LIMIT,
  MENU: STORE_MENU,
  NETWORK_OPTIONS: STORE_NETWORK_OPTIONS,
  SELECTED_NODES: STORE_SELECTED_NODES,
  MAP_STYLE: STORE_MAP_STYLE,
  TIME: STORE_TIME,
  IS_PATH_CALCULATION: STORE_IS_PATH,
  PATH_LENGTH: STORE_PATH_LENGTH,
  CONTROLLER: STORE_FORM,
} = STORE;

const NUMBERS = [STORE.LIMIT];
const BOOLEANS = [STORE.NETWORK_OPTIONS, STORE.IS_EDGES_VISIBLE, STORE.IS_PATH_CALCULATION];

const formToController = form => {
  const mapped = Object.entries(form).map(([key, value]) => [
    key,
    NUMBERS.includes(key) ? Number(value) : BOOLEANS.includes(value) ? Boolean(value) : value,
  ]);

  return Object.fromEntries(mapped);
};

const useDashboard = () => {
  const [graphType, setGraphType] = useState(DEFAULT_GRAPH);
  const [mapStyle, setMapStyle] = useState(DEFAULT_STYLE);
  const [timeRange, setTimeRange] = useState(DEFAULT_RANGE);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [selectedNodes, setSelectedNodes] = useState(DEFAULT_SELECTED);
  const [networkOptions, setNetworkOptions] = useState(DEFAULT_NETWORK);
  const [isEdgesVisible, setIsEdgesVisible] = useState(DEFAULT_EDGES_VISIBLE);

  const [isPathCalculation, setIsPathCalculation] = useState(DEFAULT_PATH_CALCULATION);
  const [pathLength, setPathLength] = useState(DEFAULT_EDGES_VISIBLE);

  const [controller, setController] = useState(CONFIG_DEFAULT);

  const form = useRef();

  console.log('controller', controller);

  const pathLengthDebounced = useDebounce(pathLength);
  const limitDebounced = useDebounce(limit);
  useLocalStorage({ limit, graphType, mapStyle, networkOptions, isEdgesVisible, pathLength });

  const setMenu = useCallback(props => {
    const {
      [STORE_GRAPH]: graphType,
      [STORE_MAP_STYLE]: mapStyle,
      [STORE_LIMIT]: limit,
      [STORE_NETWORK_OPTIONS]: networkOptions,
      [STORE_EDGES]: isEdgesVisible,
      [STORE_IS_PATH]: isPathCalculation,
      [STORE_PATH_LENGTH]: pathLength,
    } = props;
    setGraphType(graphType);
    setMapStyle(mapStyle);
    setLimit(Number(limit));
    setNetworkOptions(toBoolean(networkOptions));
    setIsEdgesVisible(toBoolean(isEdgesVisible));
    setIsPathCalculation(toBoolean(isPathCalculation));
    setPathLength(Number(pathLength));

    if (!isEqual(form.current, props)) {
      form.current = props;
    }
  }, []);

  useEffect(() => {
    setController(formToController(form.current));
  }, [form.current]);

  const store = {
    [STORE_MENU]: { set: setMenu },
    [STORE_GRAPH]: { value: graphType, set: setGraphType },
    [STORE_TIME]: { value: timeRange, set: setTimeRange },
    [STORE_MAP_STYLE]: { value: mapStyle, set: setMapStyle },
    [STORE_LIMIT]: { value: limitDebounced, set: setLimit },
    [STORE_SELECTED_NODES]: { value: selectedNodes, set: setSelectedNodes },
    [STORE_NETWORK_OPTIONS]: { value: networkOptions, set: setNetworkOptions },
    [STORE_EDGES]: { value: isEdgesVisible, set: setIsEdgesVisible },
    [STORE_IS_PATH]: { value: isPathCalculation, set: setIsPathCalculation },
    [STORE_PATH_LENGTH]: { value: pathLengthDebounced, set: setPathLength },
    [STORE_FORM]: { value: controller, set: setController },
  };

  return store;
};

export default useDashboard;
