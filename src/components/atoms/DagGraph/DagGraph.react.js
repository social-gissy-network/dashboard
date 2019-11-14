import { CONFIG_DAG_GRAPH } from '@config';
import debounce from 'lodash.debounce';
import React, { useEffect, useRef, useState } from 'react';
import { Graph as D3Graph } from 'react-d3-graph';
import tw from 'tailwind.macro';
import styled from 'styled-components';
import { useAllDagEdges } from '@hooks';

const ONE_SEC = 1000;

const Container = styled.div`
  ${tw`border-black border-2 bg-pink-100`}
`;

const DagGraph = () => {
  const data = useAllDagEdges();

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
      {containerRef.current && (
        <D3Graph id="gissy" data={data} config={CONFIG_DAG_GRAPH({ width })} />
      )}
    </Container>
  );
};

export default DagGraph;
