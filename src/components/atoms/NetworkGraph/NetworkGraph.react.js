import { CONFIG_GRAPH } from '@config';
import debounce from 'lodash.debounce';
import React, { useEffect, useRef, useState } from 'react';
import { Graph as D3Graph } from 'react-d3-graph';
import tw from 'tailwind.macro';
import styled from 'styled-components';
import { useNetwork } from '@hooks';

const ONE_SEC = 1000;

const Container = styled.div`
  ${tw`min-h-screen`}
`;

const { NETWORK } = CONFIG_GRAPH;

const NetworkGraph = () => {
  const { data, loading } = useNetwork();

  const [width, setWidth] = useState();
  const containerRef = useRef();

  // First initial
  useEffect(() => {
    setWidth(containerRef.current.offsetWidth);
  }, [containerRef.current]);

  // Resize listener
  useEffect(() => {
    const onResize = () => setWidth(containerRef.current.offsetWidth);
    const debounceResize = debounce(onResize, ONE_SEC);

    window.addEventListener('resize', debounceResize);
    return () => window.removeEventListener('resize', debounceResize);
  }, []);

  return (
    <Container ref={containerRef}>
      {loading ? (
        <div>Loading</div>
      ) : data.nodes.length ? (
        <D3Graph id="gissy" data={data} config={NETWORK({ width })} />
      ) : (
        <div>Empty Data</div>
      )}
    </Container>
  );
};

export default NetworkGraph;
