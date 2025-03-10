import { WorkPeriodInfo } from '@/constants/documents';
import {
  EducationLevelInfo,
  genderInfo,
  JobCategoryInfo,
} from '@/constants/post';
import { DayOfWeek, WorkDayTime, WorkPeriod } from '@/types/api/document';
import { Gender } from '@/types/api/users';
import { EducationLevel, JobCategory } from '@/types/postCreate/postCreate';

// 입력 데이터에서 한글을 제거, 숫자만 남겨 반환하는 함수
export const extractNumbersAsNumber = (str: string): number => {
  const numbers = str.replace(/[^0-9]/g, '');
  return numbers ? parseInt(numbers) : 0;
};

// 업직종 map에서 name으로 key를 찾는 함수
export type JobCategoryNames =
  (typeof JobCategoryInfo)[keyof typeof JobCategoryInfo]['name'];

export const findJobCategoryByNameStrict = (
  name: JobCategoryNames,
): JobCategory | null => {
  const entry = Object.entries(JobCategoryInfo).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, value]) => value.name === name,
  );
  return entry ? (entry[1].key as JobCategory) : null;
};

// 학력 map에서 name으로 key를 찾는 함수
export type EducationCategoryNames =
  (typeof EducationLevelInfo)[keyof typeof EducationLevelInfo]['name'];

export const findEducationLevelByNameStrict = (
  name: EducationCategoryNames,
): EducationLevel | null => {
  const entry = Object.entries(EducationLevelInfo).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, value]) => value.name === name,
  );
  return entry ? (entry[1].key as EducationLevel) : null;
};

// 근무 기간 map에서 name으로 key를 찾는 함수
export const getWorkPeriodKeyByName = (name: string): WorkPeriod | null => {
  const entry = Object.entries(WorkPeriodInfo).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, value]) => value.name === name,
  );
  return entry ? (entry[0] as WorkPeriod) : null;
};

// 성별 map에서 name으로 key를 찾는 함수
export type GenderCategoryNames =
  (typeof genderInfo)[keyof typeof genderInfo]['name'];

export const findGenderByNameStrict = (
  name: GenderCategoryNames,
): Gender | null => {
  const entry = Object.entries(genderInfo).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, value]) => value.name === name,
  );
  return entry ? (entry[1].key as Gender) : null;
};

const dayOfWeekToKorean = (day: DayOfWeek): string => {
  switch (day) {
    case DayOfWeek.MONDAY:
      return '월';
    case DayOfWeek.TUESDAY:
      return '화';
    case DayOfWeek.WEDNESDAY:
      return '수';
    case DayOfWeek.THURSDAY:
      return '목';
    case DayOfWeek.FRIDAY:
      return '금';
    case DayOfWeek.SATURDAY:
      return '토';
    case DayOfWeek.SUNDAY:
      return '일';
    case DayOfWeek.WEEKDAYS:
      return '월/화/수/목/금';
    case DayOfWeek.WEEKEND:
      return '토/일';
    case DayOfWeek.NEGOTIABLE:
      return '요일무관';
    default:
      return '';
  }
};

export const workDayTimeToString = (workDayTime: WorkDayTime): string => {
  const days = dayOfWeekToKorean(workDayTime.day_of_week);

  // 시간이 모두 null인 경우
  if (!workDayTime.work_start_time && !workDayTime.work_end_time) {
    return `${days} / 시간무관`;
  }

  // 요일무관인 경우
  if (workDayTime.day_of_week === DayOfWeek.NEGOTIABLE) {
    return `요일무관 / ${workDayTime.work_start_time} - ${workDayTime.work_end_time}`;
  }

  // 일반적인 경우
  return `${days} / ${workDayTime.work_start_time} - ${workDayTime.work_end_time}`;
};
