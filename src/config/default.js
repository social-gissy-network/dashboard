import { LOCAL_STORAGE_KEYS } from '@constants';
import { CONFIG_MAP, CONFIG_GRAPH } from '@config';
import { getLSItem, getNumberLSItem, toBoolean } from '@utils';

const { GRAPH_TYPE, LIMIT, MAP_STYLE, NETWORK_OPTIONS, IS_EDGES_VISIBLE } = LOCAL_STORAGE_KEYS;

const edges = getLSItem(IS_EDGES_VISIBLE);
const network = getLSItem(NETWORK_OPTIONS);

const defaultOptions = {
  MAP_STYLE: getLSItem(MAP_STYLE) || CONFIG_MAP.DEFAULT_MAP_STYLE,
  GRAPH_TYPE: getLSItem(GRAPH_TYPE) || CONFIG_GRAPH.DEFAULT_GRAPH_TYPE,
  LIMIT: getNumberLSItem(LIMIT) || CONFIG_GRAPH.DEFAULT_LIMIT,
  NETWORK_OPTIONS: network ? toBoolean(network) : false,
  IS_EDGES_VISIBLE: edges ? toBoolean(edges) : true,
};

export default defaultOptions;
