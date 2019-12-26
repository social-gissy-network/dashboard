import { useQuery } from '@apollo/react-hooks';
import { STORE } from '@constants';
import { useController } from '@hooks';
import { unixToDbTime } from '@utils';
import gql from 'graphql-tag';
import { createStore } from 'reusable';

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

const GET_NODES_PATH = gql`
  query getPathsBetweenNodes($limit: Int!, $length: Int!, $nodes: [String]) {
    edges: Paths(limit: $limit, length: $length, startNodeIDs: $nodes) {
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

const useData = () => {
  const {
    controller: {
      [STORE.TIME_RANGE]: { value: timeRange },
      [STORE.LIMIT]: limit,
      [STORE.IS_PATH_CALCULATION]: isPathCalculation,
      [STORE.PATH_LENGTH]: length,
      [STORE.SELECTED_NODES]: { value: nodes },
    },
  } = useController();

  const [min, max] = timeRange.map(unixToDbTime);

  const query = isPathCalculation ? GET_NODES_PATH : GET_EDGES_IN_TIME_RANGE;
  const variables = isPathCalculation ? { limit, length, nodes } : { limit, min, max };

  const { data: fetchedData = DEFAULT, loading } = useQuery(query, { variables });

  const { edges: data } = fetchedData;
  return { data, loading };
};

export default createStore(useData);
