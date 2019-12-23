import { CONFIG_GRAPH, CONFIG_MAP } from '@config';
import { EDGE, STORE } from '@constants';
import DeckGL from '@deck.gl/react';
import { useArcs, useStore } from '@hooks';
import { mixins, PALETTE } from '@styles';
import { toRGB } from '@utils';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import { StaticMap } from 'react-map-gl';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { EdgeTooltip, Loading, NodeTooltip } from '@components';

// #region Helpers
const extractCoordinates = type => ({ [type]: { latitude, longitude } }) =>
  [longitude, latitude].map(Number);

const extractData = ({ isSource = true, object }) => object[isSource ? 'startNode' : 'stopNode'];

const getCursor = () => 'crosshair';

const LogoWrapper = styled.div`
  ${mixins.flexCenter}
  ${tw`min-h-screen`}
`;

const Reveal = styled.div`
  ${mixins.reveal}
`;
// #endregion

const ArcGraph = () => {
  const [edgeInfo, setEdgeInfo] = useState();
  const [nodeInfo, setNodeInfo] = useState();
  const [index, setIndex] = useState(-1);

  const {
    [STORE.STYLE]: { value: mapStyle },
    [STORE.SELECTED_NODES]: { set: setSelectedNode },
    [STORE.IS_EDGES_VISIBLE]: { value: visible },
  } = useStore();

  const { data, loading } = useArcs();

  const onHoverEdge = useCallback(({ object: data, x, y }) => setEdgeInfo({ data, x, y }), []);
  const onHoverNode = useCallback(
    ({ isSource = true }) => ({ object: data, x, y, index }) => {
      setNodeInfo({ isSource, data, x, y });
      setIndex(index);
    },
    [],
  );
  const onClickNode = useCallback(
    ({ isSource = true }) => ({ object, index }) => {
      setSelectedNode([extractData({ isSource, object })]);
      setIndex(index);
    },
    [],
  );

  const layers = useMemo(
    () => [
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
        highlightedObjectIndex: index,
      }),
      CONFIG_GRAPH.SCATTER_LAYER({
        id: 'scatter-target-layer',
        data,
        onClick: onClickNode({ isSource: false }),
        onHover: onHoverNode({ isSource: false }),
        getPosition: extractCoordinates(EDGE.TARGET),
        getFillColor: toRGB(PALETTE.SECONDARY),
        highlightedObjectIndex: index,
      }),
    ],
    [data, index, visible],
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
