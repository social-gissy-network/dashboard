import { useQuery } from '@apollo/react-hooks';
import { useQueryVariables, useController } from '@hooks';
import gql from 'graphql-tag';
import { createStore } from 'reusable';
import { STORE } from '@constants';

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
  Object.fromEntries(
    Object.entries(obj)
      .filter(noEmptyFilters)
      .map(([key, value]) => [key, { eq: value }]),
  );

const usePaths = () => {
  const {
    controller: { [STORE.IS_PATH_CALCULATION]: isPathCalculation },
  } = useController();

  // const { min, max, limit, length, nodes, filters } = useQueryVariables();
  const { limit, length, nodes, filters } = useQueryVariables();

  const variables = {
    limit,
    length,
    nodes,
    // filters: { startTime: { gt: min, lt: max }, ...filters },
    filters: toGraphqlFilters(filters),
  };

  const { data: fetchedData = DEFAULT, loading } = useQuery(GET_PATHS_BY_FILTER, {
    variables,
    skip: !isPathCalculation,
  });

  const { paths = [] } = fetchedData;
  const data = paths.reduce(flat, []);
  return { data, loading };
};

export default createStore(usePaths);
