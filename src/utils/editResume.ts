import { EducationLevels } from '@/constants/manageResume';
import { MypageCardData } from '@/types/manageResume/manageResume';
import { WorkPreferenceType } from '@/types/postApply/resumeDetailItem';
import { EmploymentType, JobCategory } from '@/types/postCreate/postCreate';
import {
  GetEducationType,
  InitailEducationType,
  PostEducationType,
} from '@/types/postResume/postEducation';

// 비어있는지 확인
export const isEmptyData = (data: MypageCardData) => {
  return (
    data === null ||
    (Array.isArray(data) && data.length === 0) ||
    (typeof data === 'string' && data.trim() === '')
  );
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
export const formatDateToSlash = (date: string) => date.replace(/-/g, '/');

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
export const educationDataValidation = (
  data: InitailEducationType,
): boolean => {
  if (!data) return false;

  // 1. education_level은 EducationLevels 배열 안에 있는 값이어야 함
  if (data.education_level && !EducationLevels.includes(data.education_level)) {
    return false;
  }

  // 2. school_id는 0 이상의 숫자 값이어야 함
  if (typeof data.school_id !== 'number' || data.school_id < 0) {
    return false;
  }

  // 3. major는 string값으로 비어있지 않아야 함
  if (typeof data.major !== 'string' || data.major.trim() === '') {
    return false;
  }

  // 4. gpa는 string 형태이지만, 숫자여야 함
  if (typeof data.gpa !== 'string' || isNaN(Number(data.gpa))) {
    return false;
  }

  // 5. start_date는 yyyy-mm-dd 형식이어야 함
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (data.start_date && !dateRegex.test(data.start_date)) {
    return false;
  }

  // 6. end_date도 start_date와 동일한 형식이어야 함
  if (data.end_date && !dateRegex.test(data.end_date)) {
    return false;
  }

  // 7. grade는 숫자여야 함
  if (typeof data.grade !== 'string') {
    return false;
  }

  // 모든 조건을 통과하면 true 반환
  return true;
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
export function convertStringsToApiAreas(areas: string[]): Array<{
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
export function convertJobTypesToApiFormat(
  jobTypes: string[],
): EmploymentType[] {
  return jobTypes.map((jobType) => jobType.toUpperCase() as EmploymentType);
}

// 전체 데이터를 API 요청 형식으로 변환
export function prepareWorkPreferenceData(
  areas: string[],
  jobTypes: string[],
  industries: JobCategory[],
): WorkPreferenceType {
  return {
    areas: convertStringsToApiAreas(areas),
    jobTypes: convertJobTypesToApiFormat(jobTypes),
    industries,
  };
}
