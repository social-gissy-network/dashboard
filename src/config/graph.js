import { PALETTE } from '@styles';

const graphConfig = ({ width = window.innerWidth, height = 500 }) => ({
  automaticRearrangeAfterDropNode: true,
  nodeHighlightBehavior: true,
  panAndZoom: true,
  directed: true,
  width,
  height,
  node: {
    color: PALETTE.PRIMARY,
    size: 2000,
    highlightStrokeColor: PALETTE.SECONDARY,
    highlightStrokeWidth: 4,
    fontSize: 20,
    highlightFontSize: 20,
    strokeColor: 'black',
  },
  link: {
    color: 'black',
    highlightColor: PALETTE.SECONDARY,
    strokeWidth: 4,
    semanticStrokeWidth: true,
    markerHeight: 2,
    markerWidth: 2,
  },
  d3: {
    linkLength: 200,
    gravity: -200,
  },
});

export default graphConfig;
