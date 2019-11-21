import { graphql, useStaticQuery } from 'gatsby';

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

const toUnixTime = dateStr => new Date(dateStr).valueOf();

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
