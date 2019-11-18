import React, { useEffect, useRef, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { StaticMap } from 'react-map-gl';
import { PhongMaterial } from '@luma.gl/core';
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';
import DeckGL from '@deck.gl/react';
import { PolygonLayer } from '@deck.gl/layers';
import { TripsLayer } from '@deck.gl/geo-layers';
import { darken, lighten } from 'polished';
import { PALETTE } from '@styles';
import { toRGB } from '@utils';
import { CONFIG_MAP } from '@config';

// Public Token
const MAPBOX_TOKEN =
  'pk.eyJ1IjoiZGVudmFzaCIsImEiOiJjanR0MDM3bjgxMzl1NGRwY3R6NmRoYzFhIn0.QKn_CKoTbN0xkvOsxg7ceg'; // eslint-disable-line

// Source data CSV
const DATA_URL = {
  BUILDINGS:
    'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/buildings.json', // eslint-disable-line
  TRIPS:
    'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/trips-v7.json', // eslint-disable-line
};

const ambientLight = new AmbientLight({
  color: toRGB(darken(0.3, PALETTE.SECONDARY)),
  intensity: 2.0,
});

const pointLight = new PointLight({
  color: toRGB(lighten(0.5, PALETTE.SECONDARY)),
  intensity: 3.0,
  position: [-74.05, 40.7, 8000],
});

const lightingEffect = new LightingEffect({ ambientLight, pointLight });

const material = new PhongMaterial({
  ambient: 0.1,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [60, 64, 70],
});

const DEFAULT_THEME = {
  buildingColor: toRGB(PALETTE.SECONDARY),
  trailColor0: toRGB(PALETTE.PRIMARY),
  trailColor1: toRGB(darken(0.5, PALETTE.THIRD)),
  material,
  effects: [lightingEffect],
};

const INITIAL_VIEW_STATE = {
  longitude: -74,
  latitude: 40.72,
  zoom: 13,
  pitch: 45,
  bearing: 0,
};

const landCover = [
  [
    [-74.0, 40.7],
    [-74.02, 40.7],
    [-74.02, 40.72],
    [-74.0, 40.72],
  ],
];

const NetworkGraph = props => {
  const [time, setTime] = useState(0);
  const animationFrameRef = useRef();

  useEffect(() => {
    const animate = () => {
      const {
        loopLength = 1800, // unit corresponds to the timestamp in source data
        animationSpeed = 30, // unit time per second
      } = props;
      const timestamp = Date.now() / 1000;
      const loopTime = loopLength / animationSpeed;

      setTime(((timestamp % loopTime) / loopTime) * loopLength);
      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const {
    buildings = DATA_URL.BUILDINGS,
    trips = DATA_URL.TRIPS,
    trailLength = 180,
    theme = DEFAULT_THEME,
  } = props;

  const layers = useMemo(
    () => [
      // Shadow effects Layers
      new PolygonLayer({
        id: 'ground',
        data: landCover,
        getPolygon: f => f,
        stroked: false,
        getFillColor: [0, 0, 0, 0],
      }),
      // Trips Layer
      new TripsLayer({
        id: 'trips',
        data: trips,
        getPath: d => d.path,
        getTimestamps: d => d.timestamps,
        getColor: d => (d.vendor === 0 ? theme.trailColor0 : theme.trailColor1),
        opacity: 0.3,
        widthMinPixels: 2,
        rounded: true,
        trailLength,
        currentTime: time,
        shadowEnabled: false,
      }),
      // Buildings Layer
      new PolygonLayer({
        id: 'buildings',
        data: buildings,
        extruded: true,
        wireframe: false,
        opacity: 0.5,
        getPolygon: f => f.polygon,
        getElevation: f => f.height,
        getFillColor: theme.buildingColor,
        material: theme.material,
      }),
    ],
    [time],
  );

  const { viewState, mapStyle = CONFIG_MAP.MAP_STYLE } = props;
  return (
    <DeckGL
      layers={layers}
      effects={theme.effects}
      initialViewState={INITIAL_VIEW_STATE}
      viewState={viewState}
      controller={true}>
      <StaticMap
        reuseMaps
        mapStyle={mapStyle}
        preventStyleDiffing={true}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
    </DeckGL>
  );
};

NetworkGraph.propTypes = {
  buildings: PropTypes.string,
  trips: PropTypes.string,
  trailLength: PropTypes.number,
  theme: PropTypes.object,
  loopLength: PropTypes.number,
  animationSpeed: PropTypes.number,
  viewState: PropTypes.object,
  mapStyle: PropTypes.string,
};

export default NetworkGraph;
