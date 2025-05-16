import { EducationLevels } from '@/constants/manageResume';
import { MypageCardData } from '@/types/manageResume/manageResume';
import {
  GetEducationType,
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
