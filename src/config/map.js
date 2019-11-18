import { ScatterplotLayer } from '@deck.gl/layers';

const mapConfig = {
  MAP_STYLE: 'mapbox://styles/mapbox/light-v10',
  SCATTER_LAYER: ({ data, getPosition, getFillColor }) =>
    new ScatterplotLayer({
      id: 'scatter-source',
      data,
      getPosition,
      opacity: 0.1,
      radiusScale: 5,
      radiusMinPixels: 8,
      getFillColor,
    }),
};

export default mapConfig;
