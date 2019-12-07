import { useArcs } from '@hooks';

const data2 = {
  nodes: [
    { id: 1, name: 'Harry' },
    { id: 2, name: 'Sally' },
    { id: 3, name: 'Alice' },
  ],
  links: [
    { source: 1, target: 2, label: 'label-1' },
    { source: 1, target: 3, label: 'label-2' },
  ],
};

const useNetwork = () => {
  // eslint-disable-next-line
  const { data, loading } = useArcs();
  // eslint-disable-next-line
  console.log(data);
  return data2;
};

export default useNetwork;
