import { graphql, useStaticQuery } from 'gatsby';
const query = graphql`
  {
    gissy {
      Node {
        name
      }
    }
  }
`;

const useNodes = () => {
  const {
    gissy: { Node: nodes },
  } = useStaticQuery(query);

  return nodes;
};

export default useNodes;
