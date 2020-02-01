import useStore from './useStore';

const useSubmit = () => {
  const { submit } = useStore();

  return submit;
};

export default useSubmit;
