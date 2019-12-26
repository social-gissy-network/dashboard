import { graphql, useStaticQuery } from 'gatsby';
import { toUnixTime } from '@utils';
import { useController } from '@hooks';
import { STORE } from '@constants';

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

  const {
    controller: {
      [STORE.TIME_RANGE]: { set },
    },
  } = useController();

  return [[MIN, MAX].map(toUnixTime), set];
};

export default useTimeRange;
