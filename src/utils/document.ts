import {
  EmployerInformation,
  Insurance,
  IntegratedApplicationData,
  LaborContractEmployerInfo,
  PartTimePermitFormRequest,
  WorkDayTime,
} from '@/types/api/document';
import { GiggleAddress } from '@/types/api/users';
import { extractNumbersAsNumber } from './post';
import { InsuranceInfo } from '@/constants/documents';
import { parsePhoneNumber } from './information';

export const MINIMUM_HOURLY_RATE = 10030;

// 객체의 모든 프로퍼티가 공백이 아닌지 확인하는 함수
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotEmpty = (obj: Record<string, any>): boolean => {
  return Object.entries(obj).every(([key, value]) => {
    // null 또는 undefined 체크
    if (value === null || value === undefined) {
      return false;
    }

    // 문자열이면서 phone_number가 아닌 경우 trim()으로 공백 제거 후 길이 확인
    if (typeof value === 'string' && key !== 'phone_number') {
      return value.trim().length > 0;
    }

    if (key !== 'address') {
      return value.address_detail.length <= 50;
    }
    // 숫자나 불리언 등 다른 타입은 true 반환
    return true;
  });
};

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
const isValidPhoneNumber = (phone: string) => {
  const phoneNum = parsePhoneNumber(phone);
  return (
    phoneNum.start !== '' &&
    /^[0-9]{4}$/.test(phoneNum.middle) &&
    /^[0-9]{4}$/.test(phoneNum.end)
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
    hasStringValue(data.phone_number) &&
    isEmailValid(data.email) &&
    isValidPhoneNumber(data.phone_number) &&
    isValidTermOfCompletion(data.term_of_completion)
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

export const getDetailAddress = (value: GiggleAddress) => {
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
    !info.phone_number ||
    !info.signature_base64
  ) {
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
    !info.phone_number
  ) {
    console.log('문자열');
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

export const parseStringToSafeDecimalNumberText = (value: string): string => {
  // 숫자와 소수점만 허용하는 정규식 검사
  if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
    return value;
  }

  // 유효하지 않은 입력이면 이전 유효한 값 반환
  const cleanedValue = value.replace(/[^0-9.]/g, '');

  // 소수점이 여러 개 있으면 첫 번째만 유지
  const parts = cleanedValue.split('.');
  return parts[0] + (parts.length > 1 ? '.' + parts[1] : '');
};

// 시급 필드 onBlur 이벤트 핸들러
export const handleHourlyRateBlur = (value: string) => {
  const parsedValue = parseStringToSafeNumber(value);
  return parsedValue < MINIMUM_HOURLY_RATE;
};

// base64 데이터를 디코딩해 이미지 타입을 추론하는 함수
export const getImageType = (base64String: string) => {
  // base64 디코딩
  const stringHeader = atob(base64String).slice(0, 4);
  const header = new Uint8Array(stringHeader.length);
  for (let i = 0; i < stringHeader.length; i++) {
    header[i] = stringHeader.charCodeAt(i);
  }

  // 시그니처 체크
  if (header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff) {
    return 'jpeg';
  }
  if (
    header[0] === 0x89 &&
    header[1] === 0x50 &&
    header[2] === 0x4e &&
    header[3] === 0x47
  ) {
    return 'png';
  }
  if (header[0] === 0x47 && header[1] === 0x49 && header[2] === 0x46) {
    return 'gif';
  }

  // 기본값
  return 'jpeg';
};

// 통합신청서 유효성 검사
export const validateIntegratedApplication = (
  data: IntegratedApplicationData,
): boolean => {
  // 주소 검사
  const isAddressValid =
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
    isValidPhoneNumber(data.tele_phone_number) &&
    isValidPhoneNumber(data.cell_phone_number) &&
    isValidPhoneNumber(data.school_phone_number) &&
    isValidPhoneNumber(data.new_work_place_phone_number);
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

// 보험 이름과 enum 매핑 함수
export const getInsuranceByName = (name: string): Insurance | undefined => {
  const entry = Object.entries(InsuranceInfo).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, value]) => value.name === name,
  );
  return entry ? (entry[0] as Insurance) : undefined;
};

export const getInsuranceByKey = (key: string): Insurance | undefined => {
  const entry = Object.entries(InsuranceInfo).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, value]) => value.key === key,
  );
  return entry ? (entry[0] as Insurance) : undefined;
};
