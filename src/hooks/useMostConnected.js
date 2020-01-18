import { useQuery } from '@apollo/react-hooks';
import { useQueryVariables } from '@hooks';
import { toGraphqlFilters } from '@utils';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';

const DEFAULT = { mostConnected: [] };
const flat = (acc, path) => acc.concat(path);

const GET_MOST_CONNECTED = gql`
  query getMostConnected(
    $limit: Int!
    $pathLimit: Int!
    $length: Int!
    $filters: EdgeFilterParameter
  ) {
    mostConnected: MostConnected(
      nodesLimit: $limit
      pathsLimit: $pathLimit
      pathLength: $length
      filter: $filters
    ) {
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

const useMostConnected = ({ skip }) => {
  const { min, max, limit, length, pathLimit, filters } = useQueryVariables();

  const [data, setData] = useState([]);

  const variables = {
    limit,
    length,
    pathLimit,
    filters: { ...toGraphqlFilters(filters), startTime: { gt: min, lt: max } },
  };

  const { data: fetchedData = DEFAULT, loading } = useQuery(GET_MOST_CONNECTED, {
    variables,
    skip,
  });

  useEffect(() => {
    if (!skip && !loading) {
      const { mostConnected = [] } = fetchedData;
      const data = mostConnected.reduce(flat, []);
      setData(data);
    }
  }, [fetchedData, loading, skip]);

  return { data, loading };
};

export default useMostConnected;
