const DEFAULT_PUBLIC_TOKEN = `pk.eyJ1IjoiZGVudmFzaCIsImEiOiJjanR0MDM3bjgxMzl1NGRwY3R6NmRoYzFhIn0.QKn_CKoTbN0xkvOsxg7ceg`;

const mapConfig = {
  MAP_STYLES: [
    {
      name: `Light`,
      url: `mapbox://styles/mapbox/light-v10`,
    },
    {
      name: `Street View`,
      url: `mapbox://styles/mapbox/streets-v10`,
    },
    {
      name: `Outdoors`,
      url: `mapbox://styles/mapbox/outdoors-v10`,
    },
    {
      name: `Dark`,
      url: `mapbox://styles/mapbox/dark-v9`,
    },
    {
      name: `Satellite`,
      url: `mapbox://styles/mapbox/satellite-v9`,
    },
    {
      name: `Satellite Streets`,
      url: `mapbox://styles/mapbox/satellite-streets-v10`,
    },
    {
      name: `Navigation Preview - Day`,
      url: `mapbox://styles/mapbox/navigation-preview-day-v2`,
    },
    {
      name: `Navigation Preview - Night`,
      url: `mapbox://styles/mapbox/navigation-preview-night-v2`,
    },
    {
      name: `Navigation Guidance - Day`,
      url: `mapbox://styles/mapbox/navigation-guidance-day-v2`,
    },
    {
      name: `Navigation Guidance - Night`,
      url: `mapbox://styles/mapbox/navigation-guidance-night-v2`,
    },
  ],
  VIEW_STATE: {
    latitude: 42.37250864997261,
    longitude: -71.11305356025696,
    zoom: 13,
    pitch: 45,
    bearing: 0,
  },
  MAPBOX_TOKEN: process.env.MAPBOX_TOKEN || DEFAULT_PUBLIC_TOKEN,
};

export default mapConfig;
