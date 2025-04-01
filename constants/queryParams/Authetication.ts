export const AUTH_QUERY_PARAMS = {
    USER_TYPE: "premium",
    PAGE_SIZE: 10,
    SEARCH_TYPE: {
      EXACT_MATCH: "exact_name_match",
      CONTAIN_MATCH: "contain_name_match",
    },
    FILTERS: {
      COUNTRY: "country_filter[]",
      GENDER: "gender_filter[]",
    },
  } as const;
  
  export type SearchType = typeof AUTH_QUERY_PARAMS.SEARCH_TYPE[keyof typeof AUTH_QUERY_PARAMS.SEARCH_TYPE];
  export type FilterType = typeof AUTH_QUERY_PARAMS.FILTERS[keyof typeof AUTH_QUERY_PARAMS.FILTERS];
  