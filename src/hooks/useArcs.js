import { useQuery } from '@apollo/react-hooks';
import { GissyContext } from '@store';
import { unixToDbTime } from '@utils';
import gql from 'graphql-tag';
import { useContext } from 'react';

const DEFAULT = { Edges: [] };

const GET_EDGES_IN_TIME_RANGE = gql`
  query getEdgesInTimeRange($min: String!, $max: String!) {
    Edges(filter: { startTime: { gt: $min, lt: $max } }, limit: 50) {
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
    TIME: { timeRange },
  } = useContext(GissyContext);

  const [min, max] = timeRange.map(unixToDbTime);

  const { data: fetchedData = DEFAULT, loading } = useQuery(GET_EDGES_IN_TIME_RANGE, {
    variables: { min, max },
  });

  const { Edges: data } = fetchedData;
  return { data, loading };
};

export default useArcs;
