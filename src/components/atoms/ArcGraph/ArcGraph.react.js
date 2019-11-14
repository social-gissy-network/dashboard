import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DeckGL from '@deck.gl/react';
import { ArcLayer } from '@deck.gl/layers';
import { EDGE } from '@constants';
import { useArcs } from '@hooks';
import { StaticMap } from 'react-map-gl';
import { CONFIG_MAP } from '@config';
import { toRgbArray } from '@utils';
import { PALETTE } from '@styles';

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
      hoveredObject: info.object,
      pointerX: info.x,
      pointerY: info.y,
    });

  const layers = [
    new ArcLayer({
      id: 'arc-layer',
      data: data,
      pickable: true,
      getSourcePosition: extractCoordinates(EDGE.SOURCE),
      getTargetPosition: extractCoordinates(EDGE.TARGET),
      widthMinPixels: 3,
      getSourceColor: toRgbArray(PALETTE.PRIMARY),
      getTargetColor: toRgbArray(PALETTE.SECONDARY),
      onHover,
    }),
  ];

  return (
    <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
      <StaticMap
        reuseMaps
        mapStyle={mapStyle}
        preventStyleDiffing={true}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
      {tooltipInfo && (
        <div
          style={{
            position: 'absolute',
            zIndex: 2,
            pointerEvents: 'none',
            left: tooltipInfo.pointerX,
            top: tooltipInfo.pointerY,
          }}>
          {<pre>{JSON.stringify(tooltipInfo.hoveredObject, null, 2)}</pre>}
        </div>
      )}
    </DeckGL>
  );
};

ArcGraph.propTypes = {
  mapStyle: PropTypes.string,
};

export default ArcGraph;
