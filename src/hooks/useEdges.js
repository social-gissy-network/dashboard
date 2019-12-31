import { useQuery } from '@apollo/react-hooks';
import { useQueryVariables, useController } from '@hooks';
import gql from 'graphql-tag';
import { createStore } from 'reusable';
import { STORE } from '@constants';

const DEFAULT = { edges: [] };

const GET_EDGES_IN_TIME_RANGE = gql`
  query getEdgesInTimeRange($min: String!, $max: String!, $limit: Int!) {
    edges: Edges(filter: { startTime: { gt: $min, lt: $max } }, limit: $limit) {
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

const useEdges = () => {
  const {
    controller: { [STORE.IS_PATH_CALCULATION]: isPathCalculation },
  } = useController();

  const { min, max, limit } = useQueryVariables();

  const variables = { limit, min, max };

  const { data: fetchedData = DEFAULT, loading } = useQuery(GET_EDGES_IN_TIME_RANGE, {
    variables,
    skip: isPathCalculation,
  });

  const { edges: data } = fetchedData;
  return { data, loading };
};

export default createStore(useEdges);
