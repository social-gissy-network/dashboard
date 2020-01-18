import { MODES } from '@config';
import { STORE } from '@constants';
import { useEffect } from 'react';
import useEdges from './useEdges';
import useMostConnected from './useMostConnected';
import usePaths from './usePaths';
import useStore from './useStore';

const { MODE } = STORE;

const useData = () => {
  const {
    controller: { [MODE]: mode },
    submit: { value: isSubmit, set },
  } = useStore();

  const edges = useEdges({ skip: mode !== MODES.normal });
  const paths = usePaths({ skip: !isSubmit || mode !== MODES.path });
  const mostConnected = useMostConnected({ skip: mode !== MODES.mostConnected });

  const { data, loading } = paths;

  useEffect(() => {
    if (!loading) {
      set(false);
    }
  }, [data, loading, set]);

  const res = {
    [MODES.normal]: edges,
    [MODES.path]: paths,
    [MODES.mostConnected]: mostConnected,
  };

  return res[mode];
};

export default useData;
