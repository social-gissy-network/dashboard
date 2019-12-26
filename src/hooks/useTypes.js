import { useEffect, useState } from 'react';
import { GRAPHQL_TYPES } from '@constants';
// import useFetch from 'use-http';
import { createStore } from 'reusable';
import { MOCK_TYPES } from '@config';

// const TYPES_URL = `https://gissy-graphql.herokuapp.com/types`;

// const fetchOptions = {
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   data: {},
// };

const useTypes = () => {
  // const { data } = useFetch(TYPES_URL, fetchOptions, []);

  const [edgesTypes, setEdgesTypes] = useState([]);

  useEffect(() => {
    const { types } = MOCK_TYPES;
    const {
      Edge: { fields },
    } = types;

    setEdgesTypes(
      fields.filter(({ type }) => type === GRAPHQL_TYPES.STRING).map(({ name }) => name),
      // .reduce((acc, type) => ({ ...acc, [type]: '' }), {}),
    );
  }, []);

  return edgesTypes;
};

export default createStore(useTypes);
