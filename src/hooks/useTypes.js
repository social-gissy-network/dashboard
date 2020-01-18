import { DEFAULT_TYPES_URL } from '@config';
import { GRAPHQL_TYPES } from '@constants';
import { useEffect, useState } from 'react';
import { createStore } from 'reusable';
import useFetch from 'use-http';

const TYPES_URL = process.env.TYPES_URL || DEFAULT_TYPES_URL;
const defaultFields = ['startTime', 'stopTime'];

const fetchOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
  data: { success: false },
};

const toName = ({ name }) => name;
const byStringType = ({ type }) => type === GRAPHQL_TYPES.STRING;
const byDefaultType = ({ name }) => !defaultFields.includes(name);

const useTypes = () => {
  const { data } = useFetch(TYPES_URL, fetchOptions, []);

  const [edgesTypes, setEdgesTypes] = useState([]);

  useEffect(() => {
    if (data.success) {
      const { types } = data;
      const {
        Edge: { fields },
      } = types;

      setEdgesTypes(
        fields
          .filter(byStringType)
          .filter(byDefaultType)
          .map(toName),
      );
    }
  }, [data]);

  return edgesTypes;
};

export default createStore(useTypes);
