import styled from 'styled-components';

const Text = styled.span`
  color: ${({ color }) => color};
  font-weight: ${({ strong = false }) => (strong ? 'bold' : 'normal')};
`;

export default Text;
