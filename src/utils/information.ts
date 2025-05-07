// 이름 유효성 검사 및 포맷팅 관련 유틸리티 함수들
// 이름은 영문 대소문자, 한글만 허용하며, 공백도 허용
// 연속된 공백은 하나의 공백으로 간주
export const nameRegexWithSpaces = /^[A-Za-z가-힣]+(?: [A-Za-z가-힣]+)*$/;

// 이름의 최대 길이
export const MAX_NAME_LENGTH = 50;

/**
 * 공백을 포함한 이름에서 실제 문자 수를 계산하는 함수
 * 연속된 공백은 하나의 공백으로 간주하여 계산
 * @param name 사용자가 입력한 이름
 * @returns 정규화된 공백을 포함한 문자 수
 */
export const countNormalizedNameLength = (name: string): number => {
  // 연속된 공백을 하나의 공백으로 정규화
  const normalizedName = name.replace(/\s+/g, ' ').trim();
  return normalizedName.length;
};

/**
 * 이름 유효성 검사 함수
 * 1. 공백이 허용됨 (연속된 공백은 하나로 간주)
 * 2. 이름은 글자(영문, 한글)와 공백만 포함 가능
 * 3. 정규화된 총 길이는 MAX_NAME_LENGTH(50자) 이하
 * @param name 사용자가 입력한 이름
 * @returns 유효성 검사 결과
 */
export const isValidName = (name: string): boolean => {
  const normalizedName = name.replace(/\s+/g, ' ').trim();

  const normalizedLength = normalizedName.length;
  if (normalizedLength > MAX_NAME_LENGTH) {
    return false;
  }

  return nameRegexWithSpaces.test(normalizedName);
};

// 이름 유효성 검사 함수
export const isValidFirstName = (name: string): boolean => {
  return isValidName(name);
};

export const isValidLastName = (name: string): boolean => {
  return isValidName(name);
};

// 전화번호 유효성 검사 함수
export const isValidPhoneNumber = (phone: {
  start: string;
  middle: string;
  end: string;
}) =>
  phone.start !== '' &&
  /^[0-9]{4}$/.test(phone.middle) &&
  /^[0-9]{4}$/.test(phone.end);

// input에서 maxLength만큼 값을 제한하는 함수
export const limitInputValueLength = (value: string, maxLength: number) => {
  if (value.length <= maxLength) return value;

  return value.slice(0, maxLength);
};

// 3개의 dropdown, input으로 나눠 받고 있는 state 통합하는 함수
export const formatPhoneNumber = (phone: {
  start: string;
  middle: string;
  end: string;
}) => `${phone.start}-${phone.middle}-${phone.end}`;

export const parsePhoneNumber = (phoneNumber: string) => {
  const [start, middle, end] = phoneNumber.split('-');
  return {
    start,
    middle,
    end,
  };
};

// 사업자 등록번호 입력 시 000/00/00000 형태로 슬래시 추가하기
const validateCompanyRegistrationNumber = (value: string): boolean => {
  if (value.length > 12) return false;

  for (let i = 0; i < value.length; i++) {
    if (i === 3 || i === 6) {
      if (value[i] !== '/') return false; // 3, 6번째는 / 필수
    } else if (!/^\d$/.test(value[i])) {
      return false; // 나머지는 숫자만 가능
    }
  }
  return true;
};

export const formatCompanyRegistrationNumber = (value: string) => {
  if (validateCompanyRegistrationNumber(value)) return value;

  const numberValue = value.replace(/\D/g, '').slice(0, 10);

  const formatValue =
    numberValue
      .match(/(\d{1,3})(\d{1,2})?(\d{1,5})?/)
      ?.slice(1)
      .filter(Boolean)
      .join('/') || '';

  return formatValue;
};

export const validateDateInput = (value: string) => {
  // 빈 문자열이면 무효
  if (value === '') return false;

  // 완전한 YYYY-MM-DD 형식(길이 10)이 아니면 무효
  if (value.length !== 10) return false;

  // 형식 검사 (YYYY-MM-DD)
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(value)) return false;

  // 날짜 유효성 검사
  const parts = value.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  // 연도, 월, 일 범위 검사
  if (year < 1900 || year > 2100) return false;
  if (month < 1 || month > 12) return false;

  // 각 월의 일수 확인
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) return false;

  return true;
};

export const formatDateInput = (value: string) => {
  if (validateDateInput(value)) return value;

  const numberValue = value.replace(/\D/g, '').slice(0, 8);

  const formatValue =
    numberValue
      .match(/(\d{1,4})(\d{1,2})?(\d{1,2})?/)
      ?.slice(1)
      .filter(Boolean)
      .join('-') || '';

  return formatValue;
};
