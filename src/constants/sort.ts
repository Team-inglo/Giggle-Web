export const ASCENDING_SORT_TYPE = {
  ASCENDING: 'Oldest',
  DESCENDING: 'Recent',
} as const;

export const MATCH_ASCENDING_SORT_TYPE = {
  Oldest: 'ASCENDING',
  Recent: 'DESCENDING',
} as const;

export const KO_ASCENDING_SORT_TYPE = {
  ASCENDING: '과거순',
  DESCENDING: '최신순',
} as const;

export const MATCH_KO_EN_ASCENDING_SORT = {
  과거순: 'ASCENDING',
  최신순: 'DESCENDING',
} as const;
