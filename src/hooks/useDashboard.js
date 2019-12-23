import { useState, useCallback } from 'react';
import { CONFIG_DEFAULT } from '@config';
import { useDebounce, useLocalStorage } from '@hooks';
import { toBoolean } from '@utils';
import { STORE } from '@constants';

const { MAP_STYLE, GRAPH_TYPE, LIMIT, NETWORK_OPTIONS, IS_EDGES_VISIBLE } = CONFIG_DEFAULT;
const DEFAULT_SELECTED = [];
const DEFAULT_RANGE = [0, Infinity];

const {
  GRAPH_TYPE: STORE_GRAPH,
  IS_EDGES_VISIBLE: STORE_EDGES,
  LIMIT: STORE_LIMIT,
  MENU: STORE_MENU,
  NETWORK_OPTIONS: STORE_NETWORK_OPTIONS,
  SELECTED_NODES: STORE_SELECTED_NODES,
  STYLE: STORE_MAP_STYLE,
  TIME: STORE_TIME,
} = STORE;

const useDashboard = () => {
  const [graphType, setGraphType] = useState(GRAPH_TYPE);
  const [mapStyle, setMapStyle] = useState(MAP_STYLE);
  const [timeRange, setTimeRange] = useState(DEFAULT_RANGE);
  const [limit, setLimit] = useState(LIMIT);
  const [selectedNodes, setSelectedNodes] = useState(DEFAULT_SELECTED);
  const [networkOptions, setNetworkOptions] = useState(NETWORK_OPTIONS);
  const [isEdgesVisible, setIsEdgesVisible] = useState(IS_EDGES_VISIBLE);

  const limitDebounced = useDebounce(limit);
  useLocalStorage({ limit, graphType, mapStyle, networkOptions, isEdgesVisible });

  const setMenu = useCallback(
    ({
      [STORE_GRAPH]: graphType,
      [STORE_MAP_STYLE]: mapStyle,
      [STORE_LIMIT]: limit,
      [STORE_NETWORK_OPTIONS]: networkOptions,
      [STORE_EDGES]: isEdgesVisible,
    }) => {
      setGraphType(graphType);
      setMapStyle(mapStyle);
      setLimit(Number(limit));
      setNetworkOptions(toBoolean(networkOptions));
      setIsEdgesVisible(toBoolean(isEdgesVisible));
    },
    [],
  );

  const config = {
    [STORE_MENU]: { set: setMenu },
    [STORE_GRAPH]: { value: graphType, set: setGraphType },
    [STORE_TIME]: { value: timeRange, set: setTimeRange },
    [STORE_MAP_STYLE]: { value: mapStyle, set: setMapStyle },
    [STORE_LIMIT]: { value: limitDebounced, set: setLimit },
    [STORE_SELECTED_NODES]: { value: selectedNodes, set: setSelectedNodes },
    [STORE_NETWORK_OPTIONS]: { value: networkOptions, set: setNetworkOptions },
    [STORE_EDGES]: { value: isEdgesVisible, set: setIsEdgesVisible },
  };

  return config;
};

export default useDashboard;
