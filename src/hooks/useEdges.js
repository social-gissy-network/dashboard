import { useQuery } from '@apollo/react-hooks';
import { useQueryVariables } from '@hooks';
import { toGraphqlFilters } from '@utils';
import gql from 'graphql-tag';

const DEFAULT = { edges: [] };

const GET_EDGES_IN_TIME_RANGE = gql`
  query getEdgesInTimeRange($limit: Int!, $filter: EdgeFilterParameter) {
    edges: Edges(filter: $filter, limit: $limit) {
      id
      bikeID
      userType
      birthYear
      gender
      startTime
      stopTime
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
  const { min, max, limit, filters } = useQueryVariables();

  const variables = {
    limit,
    filter: { ...toGraphqlFilters(filters), startTime: { gt: min, lt: max } },
  };

  const { data: fetchedData = DEFAULT, loading } = useQuery(GET_EDGES_IN_TIME_RANGE, {
    variables,
    skip,
  });

  const { edges: data } = fetchedData;
  return { data, loading };
};

export default useEdges;
