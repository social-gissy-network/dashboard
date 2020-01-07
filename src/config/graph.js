import { ArcLayer, ScatterplotLayer } from '@deck.gl/layers';
import { PALETTE } from '@styles';

const graphConfig = {
  DEFAULT_GRAPH_TYPE: 'Arc',
  DEFAULT_LIMIT: 50,
  DEFAULT_PATH_LENGTH: 10,
  DEFAULT_TOP_NODES: 2,
  TYPES: {
    ARC: 'Arc',
    NETWORK: 'Network',
  },
  // https://visjs.github.io/vis-network/docs/network/
  NETWORK: ({
    height = window.innerHeight,
    hierarchical = true,
    visible = true,
    physics = true,
  }) => ({
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
    autoResize: false,
    configure: {
      enabled: false,
    },
    interaction: {
      dragNodes: true,
      dragView: true,
      navigationButtons: false,
      multiselect: true,
      hover: true,
      tooltipDelay: 2,
    },
    clickToUse: true,
    physics: {
      enabled: physics,
      barnesHut: {
        avoidOverlap: physics ? 0 : 0.5,
      },
    },
  }),
  ARC_LAYER: ({ ...props }) =>
    new ArcLayer({
      autoHighlight: true,
      widthMinPixels: 3,
      pickable: true,
      ...props,
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
