import { graphql, useStaticQuery } from 'gatsby';
import { toUnixTime } from '@utils';

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

const useTimeRange = () => {
  const {
    gissy: {
      first: [{ startTime: MIN }],
      last: [{ startTime: MAX }],
    },
  } = useStaticQuery(GET_TIME_RANGE);

  return [[MIN, MAX].map(toUnixTime)];
};

export default useTimeRange;
