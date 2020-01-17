const noEmptyFilters = ([, value]) => !!value;

export const toGraphqlFilters = obj =>
  obj
    ? Object.fromEntries(
        Object.entries(obj)
          .filter(noEmptyFilters)
          .map(([key, value]) => [key, { eq: value }]),
      )
    : {};
