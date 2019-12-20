import { useState, useCallback } from 'react';
import { CONFIG_DEFAULT } from '@config';
import { useDebounce, useLocalStorage } from '@hooks';
import { toBoolean } from '@utils';

const { MAP_STYLE, GRAPH_TYPE, LIMIT, NETWORK_OPTIONS } = CONFIG_DEFAULT;

const DEFAULT_NODE_INFO = {};

const useDashboard = () => {
  const [graphType, setGraphType] = useState(GRAPH_TYPE);
  const [mapStyle, setMapStyle] = useState(MAP_STYLE);
  const [timeRange, setTimeRange] = useState([0, Infinity]);
  const [limit, setLimit] = useState(LIMIT);
  const [nodeInfo, setNodeInfo] = useState(DEFAULT_NODE_INFO);
  const [networkOptions, setNetworkOptions] = useState(NETWORK_OPTIONS);
  const limitDebounced = useDebounce(limit);

  useLocalStorage({ limit, graphType, mapStyle, networkOptions });

  const setMenu = useCallback(({ graphType, mapStyle, limit, networkOptions }) => {
    setGraphType(graphType);
    setMapStyle(mapStyle);
    setLimit(Number(limit));
    setNetworkOptions(toBoolean(networkOptions));
  }, []);

  const config = {
    MENU: { set: setMenu },
    GRAPH_TYPE: { value: graphType, set: setGraphType },
    TIME: { value: timeRange, set: setTimeRange },
    STYLE: { value: mapStyle, set: setMapStyle },
    LIMIT: { value: limitDebounced, set: setLimit },
    NODE: { value: nodeInfo, set: setNodeInfo },
    NETWORK_OPTIONS: { value: networkOptions, set: setNetworkOptions },
  };

  return config;
};

export default useDashboard;
