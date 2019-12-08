import { LOCAL_STORAGE_KEYS } from '@constants';
import { CONFIG_MAP, CONFIG_GRAPH } from '@config';
import { getLSItem, getNumberLSItem } from '@utils';

const defaultOptions = {
  MAP_STYLE: getLSItem(LOCAL_STORAGE_KEYS.MAP_STYLE) || CONFIG_MAP.DEFAULT_MAP_STYLE,
  GRAPH_TYPE: getLSItem(LOCAL_STORAGE_KEYS.GRAPH_TYPE) || CONFIG_GRAPH.DEFAULT_GRAPH_TYPE,
  LIMIT: getNumberLSItem(LOCAL_STORAGE_KEYS.LIMIT) || CONFIG_GRAPH.DEFAULT_LIMIT,
};

export default defaultOptions;
