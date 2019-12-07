import { ScatterplotLayer, ArcLayer } from '@deck.gl/layers';
import { PALETTE } from '@styles';

const graphConfig = {
  TYPES: {
    ARC: 'Arc',
    NETWORK: 'Network',
  },
  NETWORK: ({ width = window.innerWidth, height = 500 }) => ({
    automaticRearrangeAfterDropNode: true,
    nodeHighlightBehavior: true,
    panAndZoom: true,
    directed: true,
    width,
    height,
    node: {
      color: PALETTE.PRIMARY,
      size: 2000,
      highlightStrokeColor: PALETTE.SECONDARY,
      highlightStrokeWidth: 4,
      fontSize: 20,
      highlightFontSize: 20,
      strokeColor: 'black',
      labelProperty: 'name',
    },
    link: {
      color: 'black',
      labelProperty: 'label',
      renderLabel: true,
      highlightColor: PALETTE.SECONDARY,
      highlightFontSize: 10,
      fontSize: 15,
      strokeWidth: 2,
      semanticStrokeWidth: true,
      markerHeight: 2,
      markerWidth: 2,
    },
    d3: {
      linkLength: 400,
      gravity: -400,
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
