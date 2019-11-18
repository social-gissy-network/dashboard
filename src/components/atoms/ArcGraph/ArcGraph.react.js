import { EdgeTooltip } from '@components';
import { CONFIG_MAP } from '@config';
import { EDGE } from '@constants';
import { ArcLayer, ScatterplotLayer } from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';
import { useArcs } from '@hooks';
import { PALETTE } from '@styles';
import { toRGB } from '@utils';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { StaticMap } from 'react-map-gl';
import { transparentize } from 'polished';

// #region Helpers
const MAPBOX_TOKEN =
  'pk.eyJ1IjoiZGVudmFzaCIsImEiOiJjanR0MDM3bjgxMzl1NGRwY3R6NmRoYzFhIn0.QKn_CKoTbN0xkvOsxg7ceg';

const INITIAL_VIEW_STATE = {
  latitude: 42.37250864997261,
  longitude: -71.11305356025696,
  zoom: 13,
  pitch: 45,
  bearing: 0,
};

const extractCoordinates = type => ({ [type]: { latitude, longitude } }) =>
  [longitude, latitude].map(Number);
// #endregion

const ArcGraph = ({ mapStyle = CONFIG_MAP.MAP_STYLE }) => {
  const [tooltipInfo, setTooltipInfo] = useState();

  const data = useArcs();

  const onHover = info =>
    setTooltipInfo({
      data: info.object,
      x: info.x,
      y: info.y,
    });

  const layers = [
    new ArcLayer({
      id: 'arc-layer',
      data,
      pickable: true,
      getSourcePosition: extractCoordinates(EDGE.SOURCE),
      getTargetPosition: extractCoordinates(EDGE.TARGET),
      widthMinPixels: 3,
      getSourceColor: toRGB(PALETTE.PRIMARY),
      getTargetColor: toRGB(PALETTE.SECONDARY),
      onHover,
    }),
    new ScatterplotLayer({
      id: 'scatterplot-layer',
      data,
      pickable: true,
      opacity: 0.8,
      stroked: true,
      filled: true,
      radiusScale: 6,
      radiusMinPixels: 1,
      radiusMaxPixels: 100,
      lineWidthMinPixels: 1,
      getPosition: extractCoordinates(EDGE.SOURCE),
      getRadius: 5,
      getFillColor: toRGB(transparentize(0.2, PALETTE.PRIMARY)),
      getLineColor: toRGB(transparentize(0.1, PALETTE.PRIMARY)),
    }),
    new ScatterplotLayer({
      id: 'scatterplot-layer',
      data,
      pickable: true,
      opacity: 0.8,
      stroked: true,
      filled: true,
      radiusScale: 6,
      radiusMinPixels: 1,
      radiusMaxPixels: 100,
      lineWidthMinPixels: 1,
      getPosition: extractCoordinates(EDGE.TARGET),
      getRadius: 5,
      getFillColor: toRGB(transparentize(0.6, PALETTE.SECONDARY)),
      getLineColor: toRGB(transparentize(0.2, PALETTE.SECONDARY)),
    }),
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      getCursor={() => 'crosshair'}>
      <StaticMap
        reuseMaps
        mapStyle={mapStyle}
        preventStyleDiffing={true}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
      {tooltipInfo && tooltipInfo.data && (
        <EdgeTooltip data={tooltipInfo.data} pointer={{ x: tooltipInfo.x, y: tooltipInfo.y }} />
      )}
    </DeckGL>
  );
};

ArcGraph.propTypes = {
  mapStyle: PropTypes.string,
};

export default ArcGraph;
