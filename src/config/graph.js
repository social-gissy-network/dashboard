import { ScatterplotLayer, ArcLayer } from '@deck.gl/layers';
import { PALETTE } from '@styles';

const graphConfig = {
  DEFAULT_GRAPH_TYPE: 'Arc',
  DEFAULT_LIMIT: 50,
  TYPES: {
    ARC: 'Arc',
    NETWORK: 'Network',
    DAG: 'DAG',
  },
  DAG: ({ height = window.innerHeight }) => ({
    layout: {
      clusterThreshold: 10000,
    },
    nodes: {
      color: PALETTE.PRIMARY,
      shape: `box`,
      size: 50,
      font: {
        size: 20,
      },
      margin: 10,
      mass: 1,
    },
    edges: {
      color: 'black',
      length: 500,
      width: 2,
    },
    height,
    interaction: {
      multiselect: false,
      hover: true,
    },
  }),
  NETWORK: {
    ID: 'network-graph',
    CONFIG_GENERATOR: ({ width = window.innerWidth, height = window.innerHeight }) => ({
      // https://goodguydaniel.com/react-d3-graph/docs
      // Global Config
      nodeHighlightBehavior: true,
      collapsible: true,
      directed: true,
      panAndZoom: true,
      // staticGraphWithDragAndDrop: true,
      width,
      height,
      // D3 Level
      d3: {
        alphaTarget: 1,
        linkLength: 500,
        gravity: -1000,
        linkStrength: 2,
      },
      // Node Level
      node: {
        labelProperty: 'label',
        color: PALETTE.PRIMARY,
        size: 2000,
        highlightStrokeColor: PALETTE.SECONDARY,
        highlightStrokeWidth: 2,
        fontSize: 15,
        highlightFontSize: 20,
        highlightFontWeight: 'bold',
        strokeColor: 'black',
        symbolType: 'circle',
        semanticStrokeWidth: true,
        // viewGenerator: () => <NetworkNode/>,
      },
      // Link Level
      link: {
        color: 'black',
        renderLabel: false,
        highlightColor: PALETTE.SECONDARY,
        highlightFontSize: 10,
        fontSize: 15,
        markerHeight: 2,
        markerWidth: 2,
      },
    }),
  },
  ARC_LAYER: ({
    id,
    data,
    getSourcePosition,
    getTargetPosition,
    getSourceColor,
    getTargetColor,
    onHover,
  }) =>
    new ArcLayer({
      id,
      data,
      getSourcePosition,
      getTargetPosition,
      getSourceColor,
      getTargetColor,
      onHover,
      autoHighlight: true,
      widthMinPixels: 3,
      pickable: true,
    }),
  SCATTER_LAYER: ({ ...props }) =>
    new ScatterplotLayer({
      autoHighlight: true,
      radiusMinPixels: 10,
      pickable: true,
      opacity: 0.1,
      ...props,
    }),
};

export default graphConfig;
