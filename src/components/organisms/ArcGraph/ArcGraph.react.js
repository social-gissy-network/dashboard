import { CONFIG_GRAPH, CONFIG_MAP } from '@config';
import { EDGE, STORE } from '@constants';
import DeckGL from '@deck.gl/react';
import { useArcs, useStore, useController } from '@hooks';
import { mixins, PALETTE } from '@styles';
import { toRGB } from '@utils';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import { StaticMap } from 'react-map-gl';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { EdgeTooltip, Loading, NodeTooltip } from '@components';
import { darken } from 'polished';

// #region Helpers
const toCoordinatesArray = ({ latitude, longitude }) => [longitude, latitude].map(Number);
const extractCoordinates = type => ({ [type]: { latitude, longitude } }) =>
  toCoordinatesArray({ latitude, longitude });

const extractData = ({ isSource = true, object }) => object[isSource ? 'startNode' : 'stopNode'];

const getCursor = () => 'crosshair';

const LogoWrapper = styled.div`
  ${mixins.flexCenter}
  ${tw`min-h-screen`}
`;

const Reveal = styled.div`
  ${mixins.reveal}
`;

const find = target => ({ id }) => id === target;
const remove = target => ({ id }) => id !== target;
// #endregion

const ArcGraph = () => {
  const [edgeInfo, setEdgeInfo] = useState();
  const [nodeInfo, setNodeInfo] = useState();
  const [index, setIndex] = useState(-1);

  const {
    [STORE.SELECTED_NODES]: { value: selectedNodes, set: setSelectedNode },
  } = useStore();

  const {
    controller: {
      [STORE.MAP_STYLE]: { value: mapStyle },
      [STORE.IS_EDGES_VISIBLE]: { value: visible },
    },
  } = useController();

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
      setSelectedNode(selected => {
        const node = extractData({ isSource, object });
        const { id: target } = node;
        return selected.find(find(target)) ? selected.filter(remove(target)) : [...selected, node];
      });
      setIndex(index);
    },
    [],
  );

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
    [data, index, visible, selectedNodes],
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
