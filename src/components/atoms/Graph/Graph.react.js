import { GRAPH } from '@config';
import debounce from 'lodash.debounce';
import React, { useEffect, useRef, useState } from 'react';
import { Graph as D3Graph } from 'react-d3-graph';
import tw from 'tailwind.macro';
import styled from 'styled-components';

const data = {
  nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
  links: [
    { source: 'Harry', target: 'Sally' },
    { source: 'Harry', target: 'Alice' },
  ],
};
const ONE_SEC = 1000;

const Container = styled.div`
  ${tw`border-black border-2`}
`;

const Graph = () => {
  const [width, setWidth] = useState(window.innerWidth);
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
      {containerRef.current && <D3Graph id="gissy" data={data} config={GRAPH({ width })} />}
    </Container>
  );
};

export default Graph;
