import { ApplicationDetailItem } from '@/types/api/application';
import { DayOfWeek, Phone, WorkDayTime } from '@/types/api/document';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import { PostSummaryItemType } from '@/types/post/postSummaryItem';
import {
  initialJobPostingState,
  JobPostingForm,
} from '@/types/postCreate/postCreate';
import { formatPhoneNumber, parsePhoneNumber } from './information';
import { UserType } from '@/constants/user';

// 입력 데이터에서 한글을 제거, 숫자만 남겨 반환하는 함수
export const extractNumbersAsNumber = (str: string): number => {
  const numbers = str.replace(/[^0-9]/g, '');
  return numbers ? parseInt(numbers) : 0;
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

// 주 몇일 근무인지 변환하기
export const workDaysPerWeekToText = (
  workDaysPerWeek: string,
  accountType: UserType | undefined,
) => {
  if (workDaysPerWeek === '협의 가능') {
    return accountType !== UserType.OWNER ? 'Negotiable' : workDaysPerWeek;
  }

  if (accountType !== UserType.OWNER) {
    return workDaysPerWeek;
  }

  return `주 ${workDaysPerWeek[0]}일 근무`;
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

// 서버 데이터를 폼에 맞게 변환하는 함수

export const mapPostDetailDataToFormData = (
  postDetailData: any,
): JobPostingForm => {
  if (!postDetailData) return initialJobPostingState;

  const {
    company_img_url_list = [],
    title = '',
    tags = {},
    working_conditions = {},
    workplace_information = {},
    recruitment_conditions = {},
    company_information = {},
    detailed_overview = '',
  } = postDetailData;

  // 주소 데이터 처리
  const address = {
    region_1depth_name: workplace_information?.region_1depth_name || '',
    region_2depth_name: workplace_information?.region_2depth_name || '',
    region_3depth_name: workplace_information?.region_3depth_name || '',
    region_4depth_name: workplace_information?.region_4depth_name || '',
    address_name: workplace_information?.main_address || '',
    latitude: workplace_information?.latitude || 0,
    longitude: workplace_information?.longitude || 0,
    address_detail: workplace_information?.detailed_address || '',
  };

  // 근무 일정 데이터 처리
  const work_day_times = Array.isArray(working_conditions?.work_day_times)
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      working_conditions.work_day_times.map((workDayTime: any) => ({
        ...workDayTime,
        work_start_time:
          workDayTime?.work_start_time === '협의가능'
            ? null
            : workDayTime?.work_start_time,
        work_end_time:
          workDayTime?.work_end_time === '협의가능'
            ? null
            : workDayTime?.work_end_time,
      }))
    : initialJobPostingState.body.work_day_times;

  // 마감일 처리
  const recruitment_dead_line =
    recruitment_conditions?.recruitment_deadline === '상시모집'
      ? null
      : recruitment_conditions?.recruitment_deadline;

  return {
    images: company_img_url_list || [],
    body: {
      title: title || '',
      job_category: tags?.job_category || '',
      work_day_times,
      work_period: working_conditions?.work_period || '',
      hourly_rate: working_conditions?.hourly_rate || 0,
      employment_type:
        working_conditions?.employment_type ||
        initialJobPostingState.body.employment_type,
      address,
      recruitment_dead_line,
      recruitment_number: recruitment_conditions?.number_of_recruits || 0,
      gender:
        recruitment_conditions?.gender || initialJobPostingState.body.gender,
      age_restriction: recruitment_conditions?.age_restriction || null,
      education_level: recruitment_conditions?.education || '',
      visa: recruitment_conditions?.visa || [],
      recruiter_name: company_information?.recruiter || '',
      recruiter_email: company_information?.email || '',
      recruiter_phone_number: company_information?.contact || '',
      recruiter_phone: company_information?.contact
        ? parsePhoneNumber(company_information.contact)
        : initialJobPostingState.body.recruiter_phone,
      description: detailed_overview || '',
      preferred_conditions: recruitment_conditions?.preferred_conditions || '',
    },
  };
};

// 폼 데이터 전송 전 가공 함수
export const preparePostDataForSubmission = (
  values: JobPostingForm,
  id?: number,
) => {
  const formData = new FormData();

  // 이미지 처리
  values.images
    .filter((image): image is File => image instanceof File)
    .forEach((image) => {
      formData.append('image', image);
    });

  // body 데이터 준비
  const bodyData = {
    ...values.body,
    // work_day_times 처리
    work_day_times: values.body.work_day_times.map((workday) => ({
      ...workday,
      work_start_time:
        workday.work_start_time === '협의가능' ? null : workday.work_start_time,
      work_end_time:
        workday.work_end_time === '협의가능' ? null : workday.work_end_time,
    })),
    // recruiter_phone 처리
    recruiter_phone_number: formatPhoneNumber(
      values.body.recruiter_phone as Phone,
    ),
  };

  // body 데이터 추가
  formData.append(
    'body',
    new Blob([JSON.stringify(bodyData)], { type: 'application/json' }),
  );

  return {
    formData,
    id,
  };
};

// 오늘 날짜 이후의 날짜인지 확인하는 함수
export const isTodayOrFuture = (dateString: string): boolean => {
  const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd 형식으로 변환
  return dateString >= today; // 문자열 비교로도 가능 (yyyy-mm-dd 형식이므로)
};
