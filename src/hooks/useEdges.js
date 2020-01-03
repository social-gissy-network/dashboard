import { useQuery } from '@apollo/react-hooks';
import { useQueryVariables } from '@hooks';
import gql from 'graphql-tag';

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

const useEdges = ({ skip }) => {
  const { min, max, limit } = useQueryVariables();

  const variables = { limit, min, max };

  const { data: fetchedData = DEFAULT, loading } = useQuery(GET_EDGES_IN_TIME_RANGE, {
    variables,
    skip,
  });

  const { edges: data } = fetchedData;
  return { data, loading };
};

export default useEdges;
