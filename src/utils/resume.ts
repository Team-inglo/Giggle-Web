import { Majors, KoEnEnumType, Nationalities } from '@/constants/manageResume';

type KoreanLevelInput = {
  topik?: number; // 0~6
  kiip?: number; // 0~5
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

export const getKoreanAbilityLevel = ({
  topik,
  kiip,
  sejong,
}: KoreanLevelInput) => {
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
};

// 변환 함수 생성 함수
const createLookupFunction = <T extends KoEnEnumType>(
  data: T[],
  from: keyof T,
  to: keyof T,
) => {
  const lookupMap = new Map(
    data.map((item) => [item[from] as string, item[to] as string]),
  );

  return (value: string): string | undefined => {
    return lookupMap.get(value);
  };
};

// 전공 변환 함수
export const getMajorKoFromEnum = createLookupFunction(Majors, 'enum', 'ko');
export const getMajorEnFromEnum = createLookupFunction(Majors, 'enum', 'en');
export const getMajorKoFromEn = createLookupFunction(Majors, 'en', 'ko');
export const getMajorEnumFromKo = createLookupFunction(Majors, 'ko', 'enum');
export const getMajorEnumFromEn = createLookupFunction(Majors, 'en', 'enum');

// 국적 변환 함수
export const getNationalityKoFromEnum = createLookupFunction(
  Nationalities,
  'enum',
  'ko',
);
export const getNationalityEnFromEnum = createLookupFunction(
  Nationalities,
  'enum',
  'en',
);
export const getNationalityEnumFromKo = createLookupFunction(
  Nationalities,
  'ko',
  'enum',
);
export const getNationalityEnumFromEn = createLookupFunction(
  Nationalities,
  'en',
  'enum',
);
