type KoreanLevelInput = {
  topik?: number; // 0~6
  kiip?: number;  // 0~5
  sejong?: number; // 0~6
};

const KOREAN_LEVEL_LABELS = [
  '전혀 불가능',
  '간단한 해석 가능',
  '의사소통 가능',
  '업무 능숙',
  '고급 구사 가능',
  '원어민 수준',
] as const;

const LEVEL_MAP = {
  topik: [1, 2, 3, 4, 4, 5, 6],
  kiip: [1, 2, 3, 4, 5, 6],
  sejong: [1, 2, 3, 4, 4, 5, 6],
} as const;

const mapLevel = (type: keyof typeof LEVEL_MAP, value?: number): number => {
  if (value === undefined) return 0;
  return LEVEL_MAP[type][value] ?? 0;
};

export const getKoreanAbilityLevel = ({ topik, kiip, sejong }: KoreanLevelInput) => {
  const levels = [
    mapLevel('topik', topik),
    mapLevel('kiip', kiip),
    mapLevel('sejong', sejong),
  ];
  const maxLevel = Math.max(...levels);

  return {
    level: maxLevel,
    label: KOREAN_LEVEL_LABELS[maxLevel - 1] ?? '정보 없음',
  };
}