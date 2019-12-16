import { useState, useCallback } from 'react';
import { CONFIG_DEFAULT } from '@config';
import useLocalStorage from './useLocalStorage';
import { useDebounce } from '@hooks';

const { MAP_STYLE, GRAPH_TYPE, LIMIT } = CONFIG_DEFAULT;

const DEFAULT_NODE_INFO = {};

const useDashboard = () => {
  const [graphType, setGraphType] = useState(GRAPH_TYPE);
  const [mapStyle, setMapStyle] = useState(MAP_STYLE);
  const [timeRange, setTimeRange] = useState([0, Infinity]);
  const [limit, setLimit] = useState(LIMIT);
  const [nodeInfo, setNodeInfo] = useState(DEFAULT_NODE_INFO);

  const limitDebounced = useDebounce(limit);

  useLocalStorage({ limit, graphType, mapStyle });

  const dispatch = useCallback(({ graphType, mapStyle, limit }) => {
    setGraphType(graphType);
    setMapStyle(mapStyle);
    setLimit(Number(limit));
  }, []);

  const config = {
    dispatch,
    GRAPH_TYPE: { value: graphType, set: setGraphType },
    TIME: { value: timeRange, set: setTimeRange },
    STYLE: { value: mapStyle, set: setMapStyle },
    LIMIT: { value: limitDebounced, set: setLimit },
    NODE: { value: nodeInfo, set: setNodeInfo },
  };

  return config;
};

export default useDashboard;
