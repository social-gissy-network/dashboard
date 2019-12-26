import { LOCAL_STORAGE_KEYS, STORE } from '@constants';
import { CONFIG_GRAPH } from '@config';
import { getLsItem } from '@utils';

const controller = getLsItem(LOCAL_STORAGE_KEYS.CONTROLLER);

const DEFAULT = {
  [STORE.GRAPH_TYPE]: CONFIG_GRAPH.DEFAULT_GRAPH_TYPE,
  [STORE.LIMIT]: CONFIG_GRAPH.DEFAULT_LIMIT,
  [STORE.TIME_RANGE]: [0, Date.now()],
  [STORE.SELECTED_NODES]: [],
};

const defaultController = {
  CONTROLLER: { ...DEFAULT, ...controller },
};

export default defaultController;
