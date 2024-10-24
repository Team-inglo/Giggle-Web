import { WorkDayTime } from '@/types/api/document';
import { Address } from '@/types/api/users';

// 객체의 모든 프로퍼티가 공백이 아닌지 확인하는 함수
export const isNotEmpty = (obj: Record<string, any>): boolean => {
  return Object.values(obj).every((value) => {
    // null 또는 undefined 체크
    if (value === null || value === undefined) {
      return false;
    }

    // 문자열인 경우 trim()으로 공백 제거 후 길이 확인
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }

    // 숫자나 불리언 등 다른 타입은 true 반환
    return true;
  });
};

export const workDayTimeToString = (workDayTimes: WorkDayTime[]): string => {
  // 요일만 추출하여 배열로 만들기
  const daysOfWeek = workDayTimes.map((wdt) => wdt.day_of_week);

  // 첫 번째 항목의 시간 정보 가져오기 (모든 요일의 시간이 같다고 가정)
  const { work_start_time, work_end_time } = workDayTimes[0];

  return `${arrayToString(daysOfWeek)} / ${work_start_time} - ${work_end_time}`;
};

export const getDetailAddress = (value: Address) => {
  return value.address_detail;
};

export const arrayToString = (array: string[]): string => {
  return array
    .map(
      (item) => item.charAt(0).toUpperCase() + item.slice(1, 3).toLowerCase(),
    )
    .join(',');
};

export const propertyToString = (value: string) => {
  const spaceConverted = value.replace(/_/g, ' ');
  return (
    spaceConverted.charAt(0).toUpperCase() +
    spaceConverted.slice(1).toLowerCase()
  );
};
