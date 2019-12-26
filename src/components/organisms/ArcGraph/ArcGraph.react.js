import { EdgeTooltip, Loading, NodeTooltip } from '@components';
import { CONFIG_GRAPH, CONFIG_MAP } from '@config';
import { EDGE } from '@constants';
import DeckGL from '@deck.gl/react';
import { useArcs } from '@hooks';
import { mixins, PALETTE } from '@styles';
import { toRGB, arcGraphUtils } from '@utils';
import { darken } from 'polished';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import { StaticMap } from 'react-map-gl';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const {
  setOnClickNode,
  setOnHover,
  setOnHoverNode,
  extractCoordinates,
  getCursor,
  toCoordinatesArray,
} = arcGraphUtils;

const LogoWrapper = styled.div`
  ${mixins.flexCenter}
  ${tw`min-h-screen`}
`;

const Reveal = styled.div`
  ${mixins.reveal}
`;

const ArcGraph = () => {
  const [edgeInfo, setEdgeInfo] = useState();
  const [nodeInfo, setNodeInfo] = useState();

  const {
    data,
    loading,
    mapStyle,
    visible,
    selectedNodes: { set: setSelectedNodes, value: selectedNodes },
  } = useArcs();

  const onHoverEdge = useCallback(setOnHover(setEdgeInfo), []);
  const onHoverNode = useCallback(setOnHoverNode(setNodeInfo), []);
  const onClickNode = useCallback(setOnClickNode(setSelectedNodes), []);

  const layers = useMemo(
    () => [
      CONFIG_GRAPH.SCATTER_LAYER({
        id: 'scatter-selected-nodes',
        data: selectedNodes,
        getPosition: toCoordinatesArray,
        getFillColor: toRGB(darken(0.2, PALETTE.PRIMARY)),
        opacity: 1,
        stroked: true,
        lineWidthMinPixels: 2,
        lineWidthScale: 2,
      }),
      CONFIG_GRAPH.ARC_LAYER({
        id: 'arc-layer',
        data,
        visible,
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
        onClick: onClickNode({ isSource: true }),
        getPosition: extractCoordinates(EDGE.SOURCE),
        getFillColor: toRGB(PALETTE.PRIMARY),
      }),
      CONFIG_GRAPH.SCATTER_LAYER({
        id: 'scatter-target-layer',
        data,
        onClick: onClickNode({ isSource: false }),
        onHover: onHoverNode({ isSource: false }),
        getPosition: extractCoordinates(EDGE.TARGET),
        getFillColor: toRGB(PALETTE.SECONDARY),
      }),
    ],
    [data, visible, selectedNodes],
  );

  return (
    <Reveal>
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
        {loading && (
          <LogoWrapper>
            <Loading />
          </LogoWrapper>
        )}
        {edgeInfo && edgeInfo.data && <EdgeTooltip info={edgeInfo} />}
        {nodeInfo && nodeInfo.data && <NodeTooltip info={nodeInfo} />}
      </DeckGL>
    </Reveal>
  );
};

ArcGraph.propTypes = {
  mapStyle: PropTypes.string,
};

export default ArcGraph;
