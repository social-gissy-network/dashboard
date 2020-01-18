import { LOCAL_STORAGE_KEYS, STORE } from '@constants';
import { getLsObjectItem } from '@utils';
import CONFIG_GRAPH from './graph';
import CONFIG_MAP from './map';
import { MODES } from './menu';

const DEFAULT_CONTROLLER = {
  [STORE.GRAPH_TYPE]: CONFIG_GRAPH.DEFAULT_GRAPH_TYPE,
  [STORE.IS_EDGE_VISIBLE]: true,
  [STORE.IS_HIERARCHICAL_VIEW]: false,
  [STORE.IS_PHYSICS_ENABLED]: true,
  [STORE.LIMIT]: CONFIG_GRAPH.DEFAULT_LIMIT,
  [STORE.MAP_STYLE]: CONFIG_MAP.DEFAULT_MAP_STYLE,
  [STORE.PATH_LENGTH]: CONFIG_GRAPH.DEFAULT_PATH_LENGTH,
  [STORE.SELECTED_NODES]: [],
  [STORE.TIME_RANGE]: [0, Date.now()],
  [STORE.MODE]: MODES.normal,
  [STORE.PATH_LIMIT]: 10,
};

const defaultController = getLsObjectItem(LOCAL_STORAGE_KEYS.CONTROLLER) || DEFAULT_CONTROLLER;

export const DEFAULT_TYPES_URL = `https://gissy-graphql.herokuapp.com/`;
export const DEFAULT_SERVER_URL = `https://gissy-graphql.herokuapp.com/`;

export default defaultController;
