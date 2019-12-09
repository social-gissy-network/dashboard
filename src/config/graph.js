import { ScatterplotLayer, ArcLayer } from '@deck.gl/layers';
import { PALETTE } from '@styles';

const graphConfig = {
  DEFAULT_GRAPH_TYPE: 'Arc',
  DEFAULT_LIMIT: 50,
  TYPES: {
    ARC: 'Arc',
    NETWORK: 'Network',
  },
  NETWORK: ({ width = window.innerWidth, height = window.innerHeight }) => ({
    // https://goodguydaniel.com/react-d3-graph/docs
    // Global Config
    automaticRearrangeAfterDropNode: false,
    nodeHighlightBehavior: true,
    collapsible: true,
    panAndZoom: true,
    directed: true,
    focusZoom: 1,
    width,
    height,
    // D3 Level
    d3: {
      linkLength: 500,
      gravity: -800,
      linkStrength: 4,
    },
    // Node Level
    node: {
      labelProperty: 'name',
      color: PALETTE.PRIMARY,
      size: 2000,
      highlightStrokeColor: PALETTE.SECONDARY,
      highlightStrokeWidth: 2,
      fontSize: 15,
      highlightFontSize: 20,
      highlightFontWeight: 'bold',
      strokeColor: 'black',
      symbolType: 'circle',
      // viewGenerator: () => <NetworkNode/>,
    },
    // Link Level
    link: {
      labelProperty: 'name',
      color: 'black',
      renderLabel: false,
      highlightColor: PALETTE.SECONDARY,
      highlightFontSize: 10,
      fontSize: 15,
      semanticStrokeWidth: true,
      markerHeight: 2,
      markerWidth: 2,
    },
  }),
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
  SCATTER_LAYER: ({ id, data, getPosition, getFillColor, onHover }) =>
    new ScatterplotLayer({
      id,
      data,
      getPosition,
      getFillColor,
      onHover,
      autoHighlight: true,
      radiusMinPixels: 10,
      pickable: true,
      opacity: 0.1,
    }),
};

export default graphConfig;
