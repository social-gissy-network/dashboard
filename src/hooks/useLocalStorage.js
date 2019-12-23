import { useEffect } from 'react';
import { LOCAL_STORAGE_KEYS } from '@constants';
import { setLSItem } from '@utils';

const useLocalStorage = ({ mapStyle, graphType, limit, networkOptions, isEdgesVisible }) => {
  useEffect(() => {
    setLSItem(LOCAL_STORAGE_KEYS.MAP_STYLE, mapStyle);
  }, [mapStyle]);

  useEffect(() => {
    setLSItem(LOCAL_STORAGE_KEYS.GRAPH_TYPE, graphType);
  }, [graphType]);

  useEffect(() => {
    setLSItem(LOCAL_STORAGE_KEYS.LIMIT, limit);
  }, [limit]);

  useEffect(() => {
    setLSItem(LOCAL_STORAGE_KEYS.NETWORK_OPTIONS, networkOptions);
  }, [networkOptions]);

  useEffect(() => {
    setLSItem(LOCAL_STORAGE_KEYS.IS_EDGES_VISIBLE, isEdgesVisible);
  }, [isEdgesVisible]);
};

export default useLocalStorage;
