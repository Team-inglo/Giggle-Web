export const JOB_SEARCH_FILTER = [
  {
    title: "맞춤형 추천",
    filters: [
      { key: "ALL", name: "전체" },
      { key: "RECOMMENDATION", name: "신청 가능한 알바" },
    ],
  },
  {
    title: "날짜별 정렬",
    filters: [
      { key: "ASC", name: "오름차순" },
      { key: "DESC", name: "내림차순" },
    ],
  },
  {
    title: "근무지역",
    filters: [{ key: "ALL", name: "지역 추가" }],
  },
  {
    title: "기간",
    filters: [
      { key: "ALL", name: "전체" },
      { key: "OPEN", name: "신청중" },
      { key: "CLOSED", name: "신청마감" },
    ],
  },
];

/*
고용자버전 검색 필터
*/
export const EMPLOYER_JOB_SEARCH_FILTER = [
  {
    title: "맞춤형 추천",
    filters: [
      { key: "false", name: "전체" },
      { key: "true", name: "내가 올린 공고만" },
    ],
  },
  {
    title: "날짜별 정렬",
    filters: [
      { key: "ASC", name: "오름차순" },
      { key: "DESC", name: "내림차순" },
    ],
  },
  {
    title: "근무지역",
    filters: [{ key: "ALL", name: "지역 추가" }],
  },
  {
    title: "기간",
    filters: [
      { key: "ALL", name: "전체" },
      { key: "OPEN", name: "신청중" },
      { key: "CLOSED", name: "신청마감" },
    ],
  },
];
