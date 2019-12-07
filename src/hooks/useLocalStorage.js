import { useEffect } from 'react';
import { LOCAL_STORAGE_KEYS } from '@constants';
import { setLSItem } from '@utils';

const useLocalStorage = ({ mapStyle, graphType }) => {
  useEffect(() => {
    setLSItem(LOCAL_STORAGE_KEYS.MAP_STYLE, mapStyle);
  }, [mapStyle]);

  useEffect(() => {
    setLSItem(LOCAL_STORAGE_KEYS.GRAPH_TYPE, graphType);
  }, [graphType]);
};

export default useLocalStorage;
