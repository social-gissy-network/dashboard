const DEFAULT_PUBLIC_TOKEN = `pk.eyJ1IjoiZGVudmFzaCIsImEiOiJjanR0MDM3bjgxMzl1NGRwY3R6NmRoYzFhIn0.QKn_CKoTbN0xkvOsxg7ceg`;

const mapConfig = {
  MAP_STYLE: [
    `mapbox://styles/mapbox/light-v10`,
    `mapbox://styles/mapbox/streets-v10`,
    `mapbox://styles/mapbox/outdoors-v10`,
    `mapbox://styles/mapbox/light-v9`,
    `mapbox://styles/mapbox/dark-v9`,
    `mapbox://styles/mapbox/satellite-v9`,
    `mapbox://styles/mapbox/satellite-streets-v10`,
    `mapbox://styles/mapbox/navigation-preview-day-v2`,
    `mapbox://styles/mapbox/navigation-preview-night-v2`,
    `mapbox://styles/mapbox/navigation-guidance-day-v2`,
    `mapbox://styles/mapbox/navigation-guidance-night-v2`,
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
