import { LOCAL_STORAGE_KEYS, STORE } from '@constants';
import { CONFIG_GRAPH, CONFIG_MAP } from '@config';
import { getLsObjectItem } from '@utils';

const controller = getLsObjectItem(LOCAL_STORAGE_KEYS.CONTROLLER);

const DEFAULT_VALUES = {
  [STORE.TIME_RANGE]: [0, Date.now()],
  [STORE.SELECTED_NODES]: [],
  [STORE.CONTROLLER]: {
    [STORE.LIMIT]: CONFIG_GRAPH.DEFAULT_LIMIT,
    [STORE.GRAPH_TYPE]: CONFIG_GRAPH.DEFAULT_GRAPH_TYPE,
    [STORE.PATH_LENGTH]: CONFIG_GRAPH.DEFAULT_PATH_LENGTH,
    [STORE.IS_HIERARCHICAL_VIEW]: false,
    [STORE.IS_EDGES_VISIBLE]: true,
    [STORE.MAP_STYLE]: CONFIG_MAP.DEFAULT_MAP_STYLE,
  },
};

const defaults = {
  ...DEFAULT_VALUES,
  [STORE.CONTROLLER]: {
    ...controller,
  },
};

export default defaults;
