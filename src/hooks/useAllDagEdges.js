import { graphql, useStaticQuery } from 'gatsby';
const query = graphql`
  {
    gissy {
      Node {
        id
        name
      }
      Edge {
        startNode {
          id
        }
        stopNode {
          id
        }
      }
    }
  }
`;

/*
// Graph data Example
const data = {
  nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
  links: [
    { source: 'Harry', target: 'Sally' },
    { source: 'Harry', target: 'Alice' },
  ],
};
*/

const useAllDagEdges = () => {
  const {
    gissy: { Node: nodes, Edge: edges },
  } = useStaticQuery(query);

  const links = edges.map(({ startNode: { id: source }, stopNode: { id: target } }) => ({
    source,
    target,
  }));

  return { nodes, links };
};

export default useAllDagEdges;
