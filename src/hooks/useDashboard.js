import { useState } from 'react';
import { CONFIG_DEFAULT } from '@config';
import useLocalStorage from './useLocalStorage';

const { MAP_STYLE, GRAPH_TYPE, LIMIT } = CONFIG_DEFAULT;

const useDashboard = () => {
  const [graphType, setGraphType] = useState(GRAPH_TYPE);
  const [mapStyle, setMapStyle] = useState(MAP_STYLE);
  const [timeRange, setTimeRange] = useState([0, Infinity]);
  const [limit, setLimit] = useState(LIMIT);

  useLocalStorage({ limit, graphType, mapStyle });

  const config = {
    GRAPH_TYPE: { value: graphType, set: setGraphType },
    TIME: { timeRange, setTimeRange },
    STYLE: { mapStyle, setMapStyle },
    LIMIT: { limit, setLimit },
  };

  return config;
};

export default useDashboard;
