import { graphql, useStaticQuery } from 'gatsby';
import moment from 'moment';

const query = graphql`
  query TimesRange {
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

const toUnixTime = dateStr => moment(dateStr, 'YYYY-MM-DD HH:mm:ss.SSSS').valueOf();

const useTimeRange = () => {
  const {
    gissy: {
      first: [{ startTime: MIN }],
      last: [{ startTime: MAX }],
    },
  } = useStaticQuery(query);

  return [MIN, MAX].map(toUnixTime);
};

export default useTimeRange;
