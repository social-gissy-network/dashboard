import { useContext } from 'react';
import { GissyContext } from '@store';
import { createStore } from 'reusable';
import { STORE } from '@constants';

const { CONTROLLER } = STORE;

const useStore = () => {
  const {
    [CONTROLLER]: { value, set },
    submit,
    setFromForm,
  } = useContext(GissyContext);

  return { controller: value, submit, set, setFromForm };
};

export default createStore(useStore);
