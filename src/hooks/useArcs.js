import { graphql, useStaticQuery } from 'gatsby';

// import {
//   allEdgesQuery,
// } from 'src/queries';

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
