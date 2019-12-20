import { ScatterplotLayer, ArcLayer } from '@deck.gl/layers';
import { PALETTE } from '@styles';

const graphConfig = {
  DEFAULT_GRAPH_TYPE: 'Arc',
  DEFAULT_LIMIT: 50,
  TYPES: {
    ARC: 'Arc',
    NETWORK: 'Network',
  },
  NETWORK: ({ height = window.innerHeight, hierarchical = false }) => ({
    layout: {
      hierarchical: {
        enabled: hierarchical,
      },
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
