import { useQuery } from '@apollo/react-hooks';
import { useQueryVariables } from '@hooks';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';

const DEFAULT = { paths: [] };
const flat = (acc, path) => acc.concat(path);

const GET_PATHS_BY_FILTER = gql`
  query getPathsByFilter(
    $limit: Int!
    $length: Int!
    $nodes: [String]
    $filters: EdgeFilterParameter
  ) {
    paths: Paths(limit: $limit, length: $length, startNodeIDs: $nodes, filter: $filters) {
      id
      startTime
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

const noEmptyFilters = ([, value]) => !!value;

const toGraphqlFilters = obj =>
  obj
    ? Object.fromEntries(
        Object.entries(obj)
          .filter(noEmptyFilters)
          .map(([key, value]) => [key, { eq: value }]),
      )
    : {};

const usePaths = ({ skip }) => {
  // const { min, max, limit, length, nodes, filters } = useQueryVariables();
  const { limit, length, nodes, filters } = useQueryVariables();

  const [data, setData] = useState([]);

  const variables = {
    limit,
    length,
    nodes,
    // filters: { startTime: { gt: min, lt: max }, ...filters },
    filters: toGraphqlFilters(filters),
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
