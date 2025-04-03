import { WorkPeriodInfo } from '@/constants/documents';
import {
  EducationLevelInfo,
  genderInfo,
  JobCategoryInfo,
} from '@/constants/post';
import { ApplicationDetailItem } from '@/types/api/application';
import { DayOfWeek, WorkDayTime, WorkPeriod } from '@/types/api/document';
import { Gender } from '@/types/api/users';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import { PostSummaryItemType } from '@/types/post/postSummaryItem';
import { EducationLevel, JobCategory } from '@/types/postCreate/postCreate';
import { PostDetailItemType } from '@/types/postDetail/postDetailItem';

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

export const dayOfWeekToKorean = (day: DayOfWeek): string => {
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

// 공고 상세 조회 데이터를 JobPostingItemType으로 변환하기
export const transformDetailToJobPostingItemType = (
  data: PostDetailItemType,
): JobPostingItemType => {
  return {
    id: data.id,
    company_name: data.company_name,
    title: data.title,
    icon_img_url: data.icon_img_url,
    representative_img_url: data.company_img_url_list?.[0]?.img_url,
    summaries: {
      address: data.summaries.address,
      work_period: data.summaries.work_period,
      work_days_per_week: data.summaries.work_days_per_week,
    },
    tags: {
      is_recruiting: data.tags.is_recruiting,
      visa: data.tags.visa,
      job_category: data.tags.job_category,
      employment_type: data.working_conditions.employment_type,
    },
    hourly_rate: data.summaries.hourly_rate,
    recruitment_dead_line: data.recruitment_conditions.recruitment_deadline,
    created_at: data.created_at,
  };
};

// 공고 요약 조회 데이터를 JobPostingItemType으로 변환하기
export const transformSummaryToJobPostingItemType = (
  data: PostSummaryItemType,
): JobPostingItemType => {
  return {
    id: 0,
    company_name: data.company_name,
    title: data.title,
    icon_img_url: data.icon_img_url,
    summaries: {
      address: data.summaries.address,
      work_period: data.summaries.work_period,
      work_days_per_week: data.summaries.work_days_per_week,
    },
    tags: {
      is_recruiting: data.tags.is_recruiting,
      visa: data.tags.visa,
      job_category: data.tags.job_category,
      employment_type: 'PARTTIME',
    },
    hourly_rate: data.summaries.hourly_rate,
    recruitment_dead_line: '',
    created_at: '',
  };
};

// 지원상태 상세 조회하기 데이터를 JobPostingItemType으로 변환하기
export const transformApplicationDetailToJobPostingItemType = (
  data: ApplicationDetailItem,
): JobPostingItemType => {
  return {
    id: data.id,
    company_name: data.company_name,
    title: data.title,
    summaries: {
      address: data.address_name,
      work_period: data.work_period,
      work_days_per_week: data.work_days_per_week,
    },
    tags: {
      is_recruiting: false,
      visa: [],
      job_category: '',
      employment_type: 'PARTTIME',
    },
    hourly_rate: data.hourly_rate,
    recruitment_dead_line: '',
    created_at: '',
  };
};
