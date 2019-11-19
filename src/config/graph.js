import { ScatterplotLayer, ArcLayer } from '@deck.gl/layers';

const graphConfig = {
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
