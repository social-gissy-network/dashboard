import { Loading } from '@components';
import { CONFIG_GRAPH } from '@config';
import { useNetwork } from '@hooks';
import { mixins } from '@styles';
import debounce from 'lodash.debounce';
import React, { useEffect, useRef, useState } from 'react';
import { Graph as D3Graph } from 'react-d3-graph';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const ONE_SEC = 1000;

const Container = styled.div`
  ${mixins.flexCenter}
  ${tw`min-h-screen`}
  background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
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
        <Loading />
      ) : data.nodes.length ? (
        <D3Graph id="gissy" data={data} config={NETWORK({ width })} />
      ) : (
        <div>Empty Data</div>
      )}
    </Container>
  );
};

export default NetworkGraph;
