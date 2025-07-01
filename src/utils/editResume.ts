import { EducationLevels } from '@/constants/manageResume';
import {
  AreaType,
  WorkPreferenceType,
} from '@/types/postApply/resumeDetailItem';
import { EmploymentType, JobCategory } from '@/types/postCreate/postCreate';
import {
  GetEducationType,
  PostEducationType,
} from '@/types/postResume/postEducation';
import { WorkExperienceRequest } from '@/types/api/resumes';

// 날짜 형식 유효성 검사
const isValidDateString = (dateStr: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateStr)) return false;
  const date = new Date(dateStr);
  if (isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== dateStr) {
    return false;
  }
  return true;
};

// 날짜 형식 변경
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1 필요
  return `${year}.${month}`;
};

// 날짜 형식 포맷팅(서버 데이터와 랜딩되는 데이터간의 변환
export const formatDateToDash = (date: string) => date.replace(/\//g, '-');

// 학력 get 데이터에서 patch 데이터로 타입 변환하는 함수
export const transformToPatchEducation = (
  data: GetEducationType,
): PostEducationType => {
  return {
    education_level: data.education_level,
    school_id: data.school.id, // school 객체에서 id 추출
    major: data.major,
    gpa: data.gpa,
    start_date: data.start_date,
    end_date: data.end_date,
    grade: data.grade,
  };
};

// 학력 추가 데이터 유효성 검사
export const educationDataValidation = (data: PostEducationType): boolean => {
  if (!data) return false;

  // 1. education_level은 EducationLevels 배열 안에 있는 값이어야 함
  if (
    data.education_level &&
    !EducationLevels.includes(data.education_level as string)
  ) {
    return false;
  }

  // 2. school_id는 0 이상의 숫자 값이어야 함
  if (typeof data.school_id === 'number' && data.school_id < 0) {
    return false;
  }

  // 3. major는 string값으로 비어있지 않아야 함
  if (typeof data.major !== 'string' || data.major.trim() === '') {
    return false;
  }

  // 4. gpa는 string 또는 number 형태이지만, 숫자여야 함
  if (
    (typeof data.gpa === 'string' && isNaN(Number(data.gpa))) ||
    (typeof data.gpa === 'number' && isNaN(data.gpa))
  ) {
    return false;
  }

  // 5. start_date가 유효한 날짜 형식이고, 실제 존재하는 날짜인지 확인
  if (data.start_date && !isValidDateString(data.start_date)) {
    return false;
  }

  // 6. end_date가 존재할 경우, 유효한 날짜 형식이고, 실제 존재하는 날짜인지 확인
  if (data.end_date) {
    if (!isValidDateString(data.end_date)) return false;

    // 7. end_date가 start_date보다 미래여야 함
    if (
      data.start_date &&
      new Date(data.end_date) <= new Date(data.start_date)
    ) {
      return false;
    }
  }

  // 7. grade는 숫자여야 함
  if (
    (typeof data.grade === 'string' && isNaN(Number(data.grade))) ||
    (typeof data.grade === 'number' && isNaN(data.grade))
  ) {
    return false;
  }

  // 모든 조건을 통과하면 true 반환
  return true;
};

//두 객체가 동일한지 비교하는 함수
export const isObjectEqual = <T>(
  obj1: T | undefined,
  obj2: T | undefined,
): boolean => {
  if (obj1 === undefined || obj2 === undefined) return false;
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};
// API 응답 데이터에서 지역 문자열 배열로 변환
export function convertApiAreasToStrings(
  areas: Array<{
    region_1depth_name: string;
    region_2depth_name: string | null;
    region_3depth_name: string | null;
  }>,
): string[] {
  return areas.map((area) => {
    const parts = [];
    if (area.region_1depth_name) parts.push(area.region_1depth_name);
    if (area.region_2depth_name) parts.push(area.region_2depth_name);
    if (area.region_3depth_name) parts.push(area.region_3depth_name);
    return parts.join(' ');
  });
}

// 지역 문자열 배열을 API 요청용 AreaType 배열로 변환
function convertStringsToApiAreas(areas: string[]): Array<{
  region_1depth_name: string;
  region_2depth_name: string | null;
  region_3depth_name: string | null;
  region_4depth_name: string | null;
}> {
  return areas.map((area) => {
    const parts = area.trim().split(/\s+/);
    return {
      region_1depth_name: parts[0] || '',
      region_2depth_name: parts[1] || null,
      region_3depth_name: parts[2] || null,
      region_4depth_name: parts[3] || null,
    };
  });
}

// 소문자 직무 문자열 배열을 API 요청용 EmploymentType 배열로 변환
function convertJobTypesToApiFormat(jobTypes: string[]): EmploymentType[] {
  return jobTypes.map((jobType) => jobType.toUpperCase() as EmploymentType);
}

// 전체 데이터를 API 요청 형식으로 변환
export function prepareWorkPreferenceData(
  areas: string[],
  jobTypes: string[],
  industries: JobCategory[],
): WorkPreferenceType {
  return {
    preference_addresses: convertStringsToApiAreas(areas),
    employment_types: convertJobTypesToApiFormat(jobTypes),
    job_categories: industries,
  };
}

// 고용 형태와 업종 이름을 보기 좋게 변환하는 함수
export const formatEnumValue = (value: string) => {
  return value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' / ');
};

// 지역 표시 형식
export const formatArea = (area: AreaType) => {
  return area.region_2depth_name || area.region_1depth_name;
};

export const workExperienceDataValidation = (
  data: WorkExperienceRequest,
): boolean => {
  if (!data) return false;

  const { title, workplace, start_date, end_date } = data;

  // 1. 필수 필드 (title, workplace, start_date)가 비어있지 않아야 함
  if (!title || !workplace || !start_date) {
    return false;
  }

  // 2. start_date가 유효한 날짜 형식이고, 실제 존재하는 날짜인지 확인
  if (!isValidDateString(start_date)) {
    return false;
  }

  // 3. end_date가 존재할 경우, 유효한 날짜 형식이고, 실제 존재하는 날짜인지 확인
  if (end_date) {
    if (!isValidDateString(end_date)) return false;

    // 4. end_date가 start_date보다 미래여야 함
    if (new Date(end_date) <= new Date(start_date)) {
      return false;
    }
  }

  return true;
};
