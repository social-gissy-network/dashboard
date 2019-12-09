import { CONFIG_GRAPH, CONFIG_MAP } from '@config';
import { EDGE } from '@constants';
import DeckGL from '@deck.gl/react';
import { useArcs } from '@hooks';
import { GissyContext } from '@store';
import { mixins, PALETTE } from '@styles';
import { toRGB } from '@utils';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { StaticMap } from 'react-map-gl';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { EdgeTooltip, Loading, NodeTooltip } from '@components';

// #region Helpers
const extractCoordinates = type => ({ [type]: { latitude, longitude } }) =>
  [longitude, latitude].map(Number);

const getCursor = () => 'crosshair';

const LogoWrapper = styled.div`
  ${mixins.flexCenter}
  ${tw`min-h-screen`}
`;

const Reveal = styled.div`
  ${mixins.reveal}
`;
// #endregion

const Check = () => {
  const [edgeInfo, setEdgeInfo] = useState();
  const [nodeInfo, setNodeInfo] = useState();

  const {
    STYLE: { value: mapStyle },
  } = useContext(GissyContext);

  const { data, loading } = useArcs();

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

Check.propTypes = {
  mapStyle: PropTypes.string,
};

export default Check;
