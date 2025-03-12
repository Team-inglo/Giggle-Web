import {
  ASCENDING_SORT_TYPE,
  KO_ASCENDING_SORT_TYPE,
  MATCH_ASCENDING_SORT_TYPE,
  MATCH_KO_EN_ASCENDING_SORT,
} from '@/constants/sort';

export type AscendingSortType =
  (typeof ASCENDING_SORT_TYPE)[keyof typeof ASCENDING_SORT_TYPE];

export type MatchAscendingSortType =
  (typeof MATCH_ASCENDING_SORT_TYPE)[keyof typeof MATCH_ASCENDING_SORT_TYPE];

export type KoAscendingSortType =
  (typeof KO_ASCENDING_SORT_TYPE)[keyof typeof KO_ASCENDING_SORT_TYPE];

export type MatchKoEnAscendingSortType =
  (typeof MATCH_KO_EN_ASCENDING_SORT)[keyof typeof MATCH_KO_EN_ASCENDING_SORT];
