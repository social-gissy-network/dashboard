import { useQuery } from '@apollo/react-hooks';
import { useQueryVariables, useController } from '@hooks';
import gql from 'graphql-tag';
import { createStore } from 'reusable';
import { STORE } from '@constants';

const DEFAULT = { paths: [] };

const GET_NODES_PATH = gql`
  query getPathsBetweenNodes(
    $limit: Int!
    $length: Int!
    $min: String!
    $max: String!
    $nodes: [String]
    $bikeID: String
  ) {
    paths: Paths(
      limit: $limit
      length: $length
      startNodeIDs: $nodes
      filter: { bikeID: { eq: $bikeID }, startTime: { gt: $min, lt: $max } }
    ) {
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

const usePaths = () => {
  const {
    controller: { [STORE.IS_PATH_CALCULATION]: isPathCalculation },
  } = useController();

  const { min, max, limit, length, nodes, filters } = useQueryVariables();

  const variables = { limit, length, nodes, min, max, ...filters };

  const { data: fetchedData = DEFAULT, loading } = useQuery(GET_NODES_PATH, {
    variables,
    skip: !isPathCalculation,
  });

  const { paths = [] } = fetchedData;

  const data = paths.flat();

  return { data, loading };
};

export default createStore(usePaths);
