import { useQuery } from '@apollo/react-hooks';
import { GissyContext } from '@store';
import { unixToDbTime } from '@utils';
import gql from 'graphql-tag';
import { useContext } from 'react';
import { createStore } from 'reusable';

const DEFAULT = { Edges: [] };

const GET_EDGES_IN_TIME_RANGE = gql`
  query getEdgesInTimeRange($min: String!, $max: String!, $limit: Int!) {
    Edges(filter: { startTime: { gt: $min, lt: $max } }, limit: $limit) {
      id
      startNode {
        id
        name
        latitude
        longitude
      }
      stopNode {
        id
        name
        latitude
        longitude
      }
    }
  }
`;

const useArcs = () => {
  const {
    TIME: { value: timeRange },
    LIMIT: { value: limit },
  } = useContext(GissyContext);

  const [min, max] = timeRange.map(unixToDbTime);

  const { data: fetchedData = DEFAULT, loading } = useQuery(GET_EDGES_IN_TIME_RANGE, {
    variables: { min, max, limit },
  });

  const { Edges: data } = fetchedData;
  return { data, loading };
};

export default createStore(useArcs);
