import { graphql, useStaticQuery } from 'gatsby';

const query = graphql`
  query AllEdges {
    gissy {
      Edges(limit: 50) {
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
  }
`;

const useArcs = () => {
  const {
    gissy: { Edges: edges },
  } = useStaticQuery(query);

  return edges;
};

export default useArcs;

/* Apollo client example
import { useQuery } from '@apollo/react-hooks';
import allEdgesQuery from '../apollo/queries/allEdges.gql';

const useArcs = () => {
  const { data, loading } = useQuery(allEdgesQuery);
  return { data, loading };
};

export default useArcs;
*/
