import { EdgeTooltip, Loading, NodeTooltip } from '@components';
import { CONFIG_GRAPH, CONFIG_MAP } from '@config';
import { EDGE } from '@constants';
import DeckGL from '@deck.gl/react';
import { useArcs } from '@hooks';
import { mixins, PALETTE } from '@styles';
import { arcGraphUtils, toRGB } from '@utils';
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
    isEdgeVisible,
    selectedNodes: { value: selected, set: setSelected },
  } = useArcs();

  const onHoverEdge = useCallback(setOnHover(setEdgeInfo), []);
  const onHoverNode = useCallback(setOnHoverNode(setNodeInfo), []);
  const onClickNode = useCallback(setOnClickNode(setSelected), []);

  const layers = useMemo(
    () => [
      CONFIG_GRAPH.SCATTER_LAYER({
        id: 'scatter-selected-nodes',
        data: selected,
        getPosition: toCoordinatesArray,
        getFillColor: toRGB(darken(0.1, PALETTE.PRIMARY)),
        opacity: 1,
        stroked: true,
        lineWidthMinPixels: 2,
        lineWidthScale: 2,
      }),
      CONFIG_GRAPH.ARC_LAYER({
        id: 'arc-layer',
        data,
        visible: isEdgeVisible,
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
        onHover: onHoverNode({ isSource: false }),
        onClick: onClickNode({ isSource: false }),
        getPosition: extractCoordinates(EDGE.TARGET),
        getFillColor: toRGB(PALETTE.SECONDARY),
      }),
    ],
    [selected, data, isEdgeVisible, onHoverEdge, onHoverNode, onClickNode],
  );

  return (
    <Reveal>
      <DeckGL
        initialViewState={CONFIG_MAP.VIEW_STATE}
        controller={true}
        layers={layers}
        getCursor={getCursor}>
        <StaticMap
          key="static-map"
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
