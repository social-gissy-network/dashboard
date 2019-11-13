// import { graphql, useStaticQuery } from 'gatsby';
// const query = graphql`
//   {
//     gissy {
//       Node {
//         id
//         name
//       }
//     }
//   }
// `;

/*
// Graph data Example
const data = {
  nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
  links: [
    { source: 'Harry', target: 'Sally' },
    { source: 'Harry', target: 'Alice' },
  ],
};

// Example response
{
  "data": {
    "gissy": {
      "Node": [
        {
          "id": "354",
          "name": "Washington St at Egremont Rd"
        }
      ]
    }
  }
}
*/

// const useAllNodes = () => {
//   /* eslint-disable */
//   const {
//     gissy: { Node: nodesArray },
//   } = useStaticQuery(query);

//   // const data = { nodes: nodesArray.map(({ name }) => ({ id: name })), links: [] };

//   return data;
// };

const data = {
  nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
  links: [
    { source: 'Harry', target: 'Sally' },
    { source: 'Harry', target: 'Alice' },
  ],
};

const useAllNodes = () => data;

export default useAllNodes;
