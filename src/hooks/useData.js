import { MODES } from '@config';
import { useEffect } from 'react';
import useEdges from './useEdges';
import useMode from './useMode';
import useMostConnected from './useMostConnected';
import usePaths from './usePaths';
import useSubmit from './useSubmit';

const useData = () => {
  const { value: mode } = useMode();
  const { value: isSubmit, set } = useSubmit();

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
