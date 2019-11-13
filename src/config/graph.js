import { PALETTE } from '@styles';

const graphConfig = ({ width = window.innerWidth }) => ({
  automaticRearrangeAfterDropNode: true,
  nodeHighlightBehavior: true,
  panAndZoom: true,
  directed: true,
  width,
  node: {
    color: PALETTE.PINK,
    size: 2000,
    highlightStrokeColor: PALETTE.BLUE,
    fontSize: 20,
    highlightFontSize: 25,
    strokeColor: 'black',
  },
  link: {
    highlightColor: PALETTE.GREEN,
    strokeWidth: 4,
    semanticStrokeWidth: true,
  },
  d3: {
    linkLength: 200,
    gravity: -100,
  },
});

export default graphConfig;
