import { graphql, useStaticQuery } from 'gatsby';
const query = graphql`
  query AllEdges {
    gissy {
      Edges {
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
