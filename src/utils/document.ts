import {
  EmployerInformation,
  IntegratedApplicationData,
  LaborContractEmployeeInfo,
  LaborContractEmployerInfo,
  PartTimePermitFormRequest,
  Phone,
  WorkDayTime,
} from '@/types/api/document';
import { extractNumbersAsNumber } from './post';
import { DropdownOption } from '@/components/Document/write/input/DropdownInput';

export const MINIMUM_HOURLY_RATE = 10030;

// string data의 공백 여부를 확인하는 함수
const hasStringValue = (value: string): boolean => {
  return value.trim().length > 0;
};

// 이메일 유효성 검사 함수
const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

// 전화번호 유효성 검사 함수
const isValidPhoneNumber = (phone: Phone) => {
  return (
    phone.start !== '' &&
    /^[0-9]{4}$/.test(phone.middle) &&
    /^[0-9]{4}$/.test(phone.end)
  );
};

// 이수학기 유효성 검사 함수
const isValidTermOfCompletion = (term: number): boolean => {
  return !isNaN(term) && term > 0;
};

// (유학생) 시간제 근로 허가서 유효성 검사 함수
export const validatePartTimePermit = (
  data: PartTimePermitFormRequest,
): boolean => {
  // 필수 입력 항목 체크(이름, 성, 전화번호, 이메일, 이수학기, 전화번호)
  if (
    hasStringValue(data.first_name) &&
    hasStringValue(data.last_name) &&
    data.phone &&
    isEmailValid(data.email) &&
    isValidPhoneNumber(data.phone) &&
    isValidTermOfCompletion(data.term_of_completion)
  ) {
    return true;
  }
  return false;
};

// 근로계약서 유효성 검사 함수
export const validateLaborContract = (
  data: LaborContractEmployeeInfo,
): boolean => {
  // 필수 입력 항목 체크(이름, 성, 전화번호, 주소, 서명)
  if (
    hasStringValue(data.first_name) &&
    hasStringValue(data.last_name) &&
    data.phone &&
    isValidPhoneNumber(data.phone) &&
    data.address.address_detail &&
    data.address.address_detail.length <= 50 &&
    data.signature_base64
  ) {
    return true;
  }
  return false;
};

export const workDayTimeToString = (workDayTimes: WorkDayTime[]): string => {
  // 요일만 추출하여 배열로 만들기
  const daysOfWeek = workDayTimes.map((wdt) => wdt.day_of_week);

  // 첫 번째 항목의 시간 정보 가져오기 (모든 요일의 시간이 같다고 가정)
  const { work_start_time, work_end_time } = workDayTimes[0];

  return `${arrayToString(daysOfWeek)} / ${work_start_time} - ${work_end_time}`;
};

export const arrayToString = (array: string[]): string => {
  return array
    .map(
      (item) => item.charAt(0).toUpperCase() + item.slice(1, 3).toLowerCase(),
    )
    .join(',');
};

export const propertyToString = (value: string) => {
  if (['South Korea', 'SOUTH_KOREA'].includes(value)) return 'South Korea';
  const spaceConverted = value.replace(/_/g, ' ');
  return (
    spaceConverted.charAt(0).toUpperCase() +
    spaceConverted.slice(1).toLowerCase()
  );
};

// 고용주 시간제 근무 허가서 수정 양식 유효성 검사 함수
export const validateEmployerInformation = (
  info: EmployerInformation,
): boolean => {
  const companyRegistrationNumPattern = /^\d{3}\/\d{2}\/\d{5}$/;
  // 빈 문자열 체크
  if (
    !info.company_name ||
    !info.job_type ||
    !info.name ||
    !info.signature_base64
  ) {
    return false;
  }

  if (!info.phone || !isValidPhoneNumber(info.phone)) {
    return false;
  }

  // 사업자등록번호 유효성 검사 (000/00/00000) 양식
  if (
    !info.company_registration_number ||
    !companyRegistrationNumPattern.test(info.company_registration_number)
  ) {
    return false;
  }

  // 시급 유효성 검사(0이 아닌지)
  if (
    !info.hourly_rate ||
    extractNumbersAsNumber(String(info.hourly_rate)) < MINIMUM_HOURLY_RATE
  ) {
    return false;
  }

  // 근무일 체크
  if (!info.work_days_weekdays || !info.work_days_weekends) {
    return false;
  }

  // 주소 체크
  if (
    !info.address?.region_1depth_name ||
    !info.address.address_detail ||
    info.address.address_detail.length > 50
  ) {
    return false;
  }

  return true;
};

// 근로계약서 수정 양식 유효성 검사 함수
export const validateLaborContractEmployerInformation = (
  info: LaborContractEmployerInfo,
): boolean => {
  const companyRegistrationNumPattern = /^\d{3}\/\d{2}\/\d{5}$/;
  // 빈 문자열 체크
  if (
    !info.company_name ||
    !info.name ||
    !info.description ||
    !info.phone ||
    !isValidPhoneNumber(info.phone)
  ) {
    return false;
  }

  // 사업자등록번호 유효성 검사 (12자리 숫자)
  if (
    !info.company_registration_number ||
    !companyRegistrationNumPattern.test(info.company_registration_number)
  ) {
    return false;
  }

  // 시급 유효성 검사(0이 아닌지)
  if (
    !info.hourly_rate ||
    extractNumbersAsNumber(String(info.hourly_rate)) < MINIMUM_HOURLY_RATE
  ) {
    return false;
  }

  // 급료 지급일 유효성 검사(0이 아닌지)
  if (
    !info.payment_day ||
    Number(info.payment_day) > 31 ||
    Number(info.payment_day) < 1
  ) {
    return false;
  }

  // 근무일 체크
  if (!info.work_day_time_list || info.work_day_time_list.length === 0) {
    return false;
  }

  // 주휴일 체크
  if (!info.weekly_last_days || info.weekly_last_days.length === 0) {
    return false;
  }

  // 서명 체크
  if (!info.signature_base64 || info.signature_base64 === '') {
    return false;
  }

  // 주소 체크
  if (
    !info.address?.region_1depth_name ||
    !info.address.address_detail ||
    info.address.address_detail.length > 50
  ) {
    return false;
  }

  return true;
};

// number만 가능한 필드에서 NaN 입력으로 input이 멈추지 않게 값 검증
export const parseStringToSafeNumber = (value: string): number => {
  const numberValue = Number(value);
  if (isNaN(numberValue)) return 0;
  else return numberValue;
};

// 통합신청서 유효성 검사
export const validateIntegratedApplication = (
  data: IntegratedApplicationData,
): boolean => {
  // 주소 검사
  const isAddressValid =
    !!data.address.region_1depth_name &&
    data.address.region_1depth_name !== '' &&
    !!data.address.address_detail &&
    data.address.address_detail.length <= 50;

  // annual_income_amount 검사
  const isIncomeValid = data.annual_income_amount !== 0;

  // 이메일 검사
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(data.email)) {
    return false;
  }

  // 사업자등록번호 유효성 검사 (000/00/00000) 양식
  const companyRegistrationNumPattern = /^\d{3}\/\d{2}\/\d{5}$/;
  if (
    !data.new_work_place_registration_number ||
    !companyRegistrationNumPattern.test(data.new_work_place_registration_number)
  ) {
    return false;
  }

  // 전화번호 필드들 검사
  const isPhoneValid =
    isValidPhoneNumber(data.tele_phone as Phone) &&
    isValidPhoneNumber(data.cell_phone as Phone) &&
    isValidPhoneNumber(data.school_phone as Phone) &&
    isValidPhoneNumber(data.new_work_place_phone as Phone);
  // 나머지 필드 검사
  const otherFieldsValid = Object.entries(data).every(([key, value]) => {
    // 앞서 검사한 필드들은 스킵
    if (
      key === 'address' ||
      key === 'annual_income_amount' ||
      key === 'new_work_place_registration_number' ||
      key === 'email'
    ) {
      return true;
    }
    // 나머지 필드는 빈 문자열이 아닌지 확인
    return value !== '';
  });

  return isAddressValid && isIncomeValid && isPhoneValid && otherFieldsValid;
};

// 입력 형식 처리를 위한 유틸리티 함수
type InputFormatter = (value: string) => string;

// 다양한 포맷 옵션을 매핑하는 객체
const formatters: Record<string, InputFormatter> = {
  // 숫자만 허용
  'numbers-only': (value) => value.replace(/[^0-9]/g, ''),
  // 사업자등록번호 포맷 (000/00/00000)
  'business-id': (value) => {
    const digitsOnly = value.replace(/[^0-9]/g, '');
    if (digitsOnly.length <= 3) return digitsOnly;
    if (digitsOnly.length <= 5)
      return `${digitsOnly.slice(0, 3)}/${digitsOnly.slice(3)}`;
    return `${digitsOnly.slice(0, 3)}/${digitsOnly.slice(3, 5)}/${digitsOnly.slice(5, 10)}`;
  },

  // 날짜 포맷 (YYYY-MM-DD)
  date: (value) => {
    const digitsOnly = value.replace(/[^0-9]/g, '');
    if (digitsOnly.length <= 4) return digitsOnly;
    if (digitsOnly.length <= 6)
      return `${digitsOnly.slice(0, 4)}-${digitsOnly.slice(4)}`;
    return `${digitsOnly.slice(0, 4)}-${digitsOnly.slice(4, 6)}-${digitsOnly.slice(6, 8)}`;
  },

  // 알파벳만 허용
  'alpha-only': (value) => value.replace(/[^a-zA-Z]/g, ''),

  // 알파벳과 숫자만 허용
  alphanumeric: (value) => value.replace(/[^a-zA-Z0-9]/g, ''),

  // 최대 글자수 제한 (예: 'max-length-10')
  'max-length': (value, maxLength = 10) => value.slice(0, maxLength),
};

// 포맷팅 적용 함수
export const applyFormat = (
  value: string,
  format?: string | string[],
): string => {
  if (!format) return value;

  let result = value;
  const formatList = Array.isArray(format) ? format : [format];

  for (const formatKey of formatList) {
    // 특수 형식: max-length-N
    if (formatKey.startsWith('max-length-')) {
      const maxLength = parseInt(formatKey.split('-')[2], 10);
      result = result.slice(0, maxLength);
      continue;
    }

    // 일반 포맷터 적용
    const formatter = formatters[formatKey];
    if (formatter) {
      result = formatter(result);
    }
  }

  return result;
};

export const convertToDropdownOption = <
  T extends Record<string, { name: string; [key: string]: unknown }>,
>(
  keyNameInfo: T,
): DropdownOption[] => {
  return Object.entries(keyNameInfo).map(([key, value]) => ({
    key,
    name: value.name,
  }));
};
