import { EdgeTooltip, NodeTooltip } from '@components';
import { CONFIG_GRAPH, CONFIG_MAP } from '@config';
import { EDGE } from '@constants';
import DeckGL from '@deck.gl/react';
import { useArcs } from '@hooks';
import { GissyContext } from '@store';
import { PALETTE } from '@styles';
import { toRGB } from '@utils';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { StaticMap } from 'react-map-gl';

// #region Helpers
const extractCoordinates = type => ({ [type]: { latitude, longitude } }) =>
  [longitude, latitude].map(Number);

const getCursor = () => 'crosshair';
// #endregion

const ArcGraph = () => {
  const [edgeInfo, setEdgeInfo] = useState();
  const [nodeInfo, setNodeInfo] = useState();

  const {
    STYLE: { mapStyle },
  } = useContext(GissyContext);

  const { data } = useArcs();

  const onHoverEdge = useCallback(({ object: data, x, y }) => setEdgeInfo({ data, x, y }), []);
  const onHoverNode = useCallback(
    ({ isSource }) => ({ object: data, x, y }) => setNodeInfo({ isSource, data, x, y }),
    [],
  );

  const layers = useMemo(
    () => [
      CONFIG_GRAPH.ARC_LAYER({
        id: 'arc-layer',
        data,
        onHover: onHoverEdge,
        getSourcePosition: extractCoordinates(EDGE.SOURCE),
        getTargetPosition: extractCoordinates(EDGE.TARGET),
        getSourceColor: toRGB(PALETTE.PRIMARY),
        getTargetColor: toRGB(PALETTE.SECONDARY),
      }),
      CONFIG_GRAPH.SCATTER_LAYER({
        id: 'scatter-source-layer',
        data,
        onHover: onHoverNode({ isSource: true }),
        getPosition: extractCoordinates(EDGE.SOURCE),
        getFillColor: toRGB(PALETTE.PRIMARY),
      }),
      CONFIG_GRAPH.SCATTER_LAYER({
        id: 'scatter-target-layer',
        data,
        onHover: onHoverNode({ isSource: false }),
        getPosition: extractCoordinates(EDGE.TARGET),
        getFillColor: toRGB(PALETTE.SECONDARY),
      }),
    ],
    [data],
  );

  return (
    <DeckGL
      initialViewState={CONFIG_MAP.VIEW_STATE}
      controller={true}
      layers={layers}
      getCursor={getCursor}>
      <StaticMap
        reuseMaps
        mapStyle={mapStyle}
        preventStyleDiffing={true}
        mapboxApiAccessToken={CONFIG_MAP.MAPBOX_TOKEN}
      />
      {edgeInfo && edgeInfo.data && <EdgeTooltip info={edgeInfo} />}
      {nodeInfo && nodeInfo.data && <NodeTooltip info={nodeInfo} />}
    </DeckGL>
  );
};

ArcGraph.propTypes = {
  mapStyle: PropTypes.string,
};

export default ArcGraph;
