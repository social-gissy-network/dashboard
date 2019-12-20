import { useEffect } from 'react';
import { LOCAL_STORAGE_KEYS } from '@constants';
import { setLSItem } from '@utils';

const useLocalStorage = ({ mapStyle, graphType, limit, networkOptions }) => {
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
};

export default useLocalStorage;
