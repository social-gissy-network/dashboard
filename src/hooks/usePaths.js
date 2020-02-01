import { useQuery } from '@apollo/react-hooks';
import { useQueryVariables } from '@hooks';
import { toGraphqlFilters } from '@utils';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';

const DEFAULT = { paths: [] };
const flat = (acc, path) => acc.concat(path);

const GET_PATHS_BY_FILTER = gql`
  query getPathsByFilter(
    $limit: Int!
    $length: Int!
    $nodes: [String]
    $filter: EdgeFilterParameter
  ) {
    paths: Paths(limit: $limit, length: $length, startNodeIDs: $nodes, filter: $filter) {
      id
      startTime
      startTime
      stopTime
      bikeID
      userType
      birthYear
      gender
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

const usePaths = ({ skip }) => {
  const { min, max, limit, length, nodes, filters } = useQueryVariables();

  const [data, setData] = useState([]);

  const variables = {
    limit,
    length,
    nodes,
    filter: { ...toGraphqlFilters(filters), startTime: { gt: min, lt: max } },
  };

  const { data: fetchedData = DEFAULT, loading } = useQuery(GET_PATHS_BY_FILTER, {
    variables,
    skip,
  });

  useEffect(() => {
    if (!skip && !loading) {
      const { paths = [] } = fetchedData;
      const data = paths.reduce(flat, []);
      setData(data);
    }
  }, [fetchedData, loading, skip]);

  return { data, loading };
};

export default usePaths;
