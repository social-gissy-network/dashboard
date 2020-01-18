import { toUnixTime } from '@utils';
import { graphql, useStaticQuery } from 'gatsby';

const GET_TIME_RANGE = graphql`
  query getTimeRange {
    gissy {
      first: Edges(limit: 1, sort: { startTime: ASC }) {
        startTime
      }
      last: Edges(limit: 1, sort: { startTime: DESC }) {
        startTime
      }
    }
  }
`;

const useStaticTimeRange = () => {
  const {
    gissy: {
      first: [{ startTime: MIN }],
      last: [{ startTime: MAX }],
    },
  } = useStaticQuery(GET_TIME_RANGE);

  return [MIN, MAX].map(toUnixTime);
};

export default useStaticTimeRange;
