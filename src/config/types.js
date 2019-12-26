export default {
  success: true,
  types: {
    Node: {
      fields: [
        {
          name: 'id',
          type: 'ID',
        },
        {
          name: 'latitude',
          type: 'String',
        },
        {
          name: 'longitude',
          type: 'String',
        },
        {
          name: 'name',
          type: 'String',
        },
      ],
      typeName: 'ObjectTypeDefinition',
    },
    NodeSortParameter: {
      fields: [
        {
          name: 'id',
          type: 'SortOrder',
        },
        {
          name: 'latitude',
          type: 'SortOrder',
        },
        {
          name: 'longitude',
          type: 'SortOrder',
        },
        {
          name: 'name',
          type: 'SortOrder',
        },
      ],
      typeName: 'InputObjectTypeDefinition',
    },
    NodeFilterParameter: {
      fields: [
        {
          name: 'id',
          type: 'StringOperators',
        },
        {
          name: 'latitude',
          type: 'StringOperators',
        },
        {
          name: 'longitude',
          type: 'StringOperators',
        },
        {
          name: 'name',
          type: 'StringOperators',
        },
      ],
      typeName: 'InputObjectTypeDefinition',
    },
    NodeUpdateResponse: {
      fields: [
        {
          name: 'success',
          type: 'Boolean',
        },
        {
          name: 'message',
          type: 'String',
        },
        {
          name: 'node',
          type: 'Node',
        },
      ],
      typeName: 'ObjectTypeDefinition',
    },
    Edge: {
      fields: [
        {
          name: 'startNode',
          type: 'Node',
        },
        {
          name: 'stopNode',
          type: 'Node',
        },
        {
          name: 'startTime',
          type: 'String',
        },
        {
          name: 'stopTime',
          type: 'String',
        },
        {
          name: 'bikeID',
          type: 'String',
        },
        {
          name: 'userType',
          type: 'String',
        },
        {
          name: 'birthYear',
          type: 'String',
        },
        {
          name: 'gender',
          type: 'String',
        },
        {
          name: 'id',
          type: 'ID',
        },
      ],
      typeName: 'ObjectTypeDefinition',
    },
    EdgeSortParameter: {
      fields: [
        {
          name: 'startNode',
          type: 'NodeSortParameter',
        },
        {
          name: 'stopNode',
          type: 'NodeSortParameter',
        },
        {
          name: 'startTime',
          type: 'SortOrder',
        },
        {
          name: 'stopTime',
          type: 'SortOrder',
        },
        {
          name: 'bikeID',
          type: 'SortOrder',
        },
        {
          name: 'userType',
          type: 'SortOrder',
        },
        {
          name: 'birthYear',
          type: 'SortOrder',
        },
        {
          name: 'gender',
          type: 'SortOrder',
        },
      ],
      typeName: 'InputObjectTypeDefinition',
    },
    EdgeFilterParameter: {
      fields: [
        {
          name: 'startNode',
          type: 'NodeFilterParameter',
        },
        {
          name: 'stopNode',
          type: 'NodeFilterParameter',
        },
        {
          name: 'startTime',
          type: 'StringOperators',
        },
        {
          name: 'stopTime',
          type: 'StringOperators',
        },
        {
          name: 'bikeID',
          type: 'StringOperators',
        },
        {
          name: 'userType',
          type: 'StringOperators',
        },
        {
          name: 'birthYear',
          type: 'StringOperators',
        },
        {
          name: 'gender',
          type: 'StringOperators',
        },
      ],
      typeName: 'InputObjectTypeDefinition',
    },
    EdgeUpdateResponse: {
      fields: [
        {
          name: 'success',
          type: 'Boolean',
        },
        {
          name: 'message',
          type: 'String',
        },
        {
          name: 'edge',
          type: 'Edge',
        },
      ],
      typeName: 'ObjectTypeDefinition',
    },
    SortOrder: {
      values: ['ASC', 'DESC'],
      typeName: 'EnumTypeDefinition',
    },
    StringOperators: {
      fields: [
        {
          name: 'eq',
          type: 'String',
        },
        {
          name: 'contains',
          type: 'String',
        },
        {
          name: 'gt',
          type: 'String',
        },
        {
          name: 'lt',
          type: 'String',
        },
      ],
      typeName: 'InputObjectTypeDefinition',
    },
  },
};
