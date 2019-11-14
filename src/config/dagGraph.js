import { PALETTE } from '@styles';

// https://goodguydaniel.com/react-d3-graph/sandbox/index.html

const dagGraphConfig = ({ width = window.innerWidth, height = 1000 }) => ({
  automaticRearrangeAfterDropNode: true,
  nodeHighlightBehavior: true,
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
    labelProperty: 'name',
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
    gravity: -500,
  },
});

export default dagGraphConfig;
