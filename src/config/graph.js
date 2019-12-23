import { ScatterplotLayer, ArcLayer } from '@deck.gl/layers';
import { PALETTE } from '@styles';

const graphConfig = {
  DEFAULT_GRAPH_TYPE: 'Arc',
  DEFAULT_LIMIT: 50,
  PATH_LENGTH: 10,
  TYPES: {
    ARC: 'Arc',
    NETWORK: 'Network',
  },
  NETWORK: ({ height = window.innerHeight, hierarchical = true, visible = true }) => ({
    height,
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
      title: 'title',
    },
    edges: {
      color: 'black',
      length: 500,
      width: 2,
      hidden: !visible,
    },
    interaction: {
      multiselect: true,
      hover: true,
      tooltipDelay: 0,
    },
    physics: {
      enabled: true,
      barnesHut: {
        avoidOverlap: 0,
      },
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
    visible,
  }) =>
    new ArcLayer({
      id,
      data,
      getSourcePosition,
      getTargetPosition,
      getSourceColor,
      getTargetColor,
      onHover,
      visible,
      autoHighlight: true,
      widthMinPixels: 3,
      pickable: true,
    }),
  SCATTER_LAYER: ({ opacity = 0.1, ...props }) =>
    new ScatterplotLayer({
      autoHighlight: true,
      radiusMinPixels: 10,
      pickable: true,
      opacity,
      ...props,
    }),
};

export default graphConfig;
