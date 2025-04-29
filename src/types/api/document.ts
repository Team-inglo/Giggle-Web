import { DocumentStatusEmployer } from '@/constants/documents';
import { GiggleAddress, Gender } from '@/types/api/users';

//현재 문서의 작성 상태
export type DocumentStatus =
  | 'TEMPORARY_SAVE'
  | 'SUBMITTED'
  | 'BEFORE_CONFIRMATION'
  | 'REQUEST'
  | 'CONFIRMATION';

// 통합 신청서 외 문서 타입
export type DocumentInfo = {
  id: number;
  word_url: string | null;
  status: DocumentStatus | null;
};

export type EmployDocumentInfo = {
  id: number;
  word_url: string | null;
  reason: string | null;
  status: DocumentStatusEmployer | null;
};

// 통합 신청서 타입
export type IntegratedApplicationInfo = {
  id: number;
  word_url: string | null;
};

// 문서 상태 조회 응답 양식
export type DocumentsSummaryResponse = {
  part_time_employment_permits: DocumentInfo | null;
  standard_labor_contract: DocumentInfo | null;
  integrated_application: DocumentInfo | null;
  is_completed: boolean;
};

export type EmployDocumentsSummaryResponse = {
  part_time_employment_permits: EmployDocumentInfo | null;
  standard_labor_contract: EmployDocumentInfo | null;
};

// 전화번호 state 타입
export type Phone = {
  start: string;
  middle: string;
  end: string;
};

// 문서 종류 property와 이름 mapping
export enum DocumentType {
  PART_TIME_PERMIT = 'part_time_employment_permits',
  LABOR_CONTRACT = 'standard_labor_contract',
  INTEGRATED_APPLICATION = 'integrated_application',
}

export enum EmployDocumentType {
  PART_TIME_PERMIT = 'part_time_employment_permits',
  LABOR_CONTRACT = 'standard_labor_contract',
}

// 시간제취업 허가서 유학생 정보 타입
export type EmployeeInformation = {
  first_name: string;
  last_name: string;
  major: string;
  term_of_completion: number;
  phone_number: string;
  email: string;
};

// 시간근무 허가서 유학생 정보 property와 이름 mapping
export enum PartTimeEmployeeInfoProperty {
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  MAJOR = 'major',
  TERM_OF_COMPLETION = 'term_of_completion',
  PHONE_NUMBER = 'phone_number',
  EMAIL = 'email',
}

// 근로계약서 유학생 정보 property와 이름 mapping
export enum LaborContractEmployeeInfoProperty {
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  ADDRESS = 'address',
  PHONE_NUMBER = 'phone_number',
  SIGNATURE_BASE64 = 'signature_base64',
}

// 고용주 정보 property와 이름 mapping
export enum EmployerInfoProperty {
  COMPANY_NAME = 'company_name',
  COMPANY_REGISTRATION_NUMBER = 'company_registration_number',
  NAME = 'name',
  JOB_TYPE = 'job_type',
  PHONE_NUMBER = 'phone_number',
  SIGNATURE_BASE64 = 'signature_base64',
  WORK_PERIOD = 'work_period',
  HOURLY_RATE = 'hourly_rate',
  WORK_DAYS_WEEKDAYS = 'work_days_weekdays',
  WORK_DAYS_WEEKENDS = 'work_days_weekends',
  ADDRESS = 'address',
}

// 고용주 정보 타입
export type EmployerInformation = {
  company_name: string | null;
  company_registration_number: string | null;
  job_type: string | null;
  name: string | null;
  phone?: Phone;
  phone_number: string | null;
  signature_base64: string;
  work_period: WorkPeriod | null;
  hourly_rate: number | null;
  work_days_weekdays: string | null;
  work_days_weekends: string | null;
  address: GiggleAddress;
};

// 시간제 근무 허가서 조회 응답 양식
export type PartTimePermitData = {
  employee_information: EmployeeInformation;
  employer_information: EmployerInformation | null;
};

// 시간제 근무 허가서 작성 양식
export type PartTimePermitFormRequest = {
  first_name: string;
  last_name: string;
  major: string;
  term_of_completion: number;
  phone_number: string;
  email: string;
  phone?: Phone;
};

// 근로 계약서 조회 응답 양식
export type LaborContractDataResponse = {
  employee_information: LaborContractEmployeeInfo;
  employer_information: LaborContractEmployerInfo | null;
};

// 근로 계약서 작성 양식
export type LaborContractEmployeeInfo = {
  first_name: string;
  last_name: string;
  address: GiggleAddress;
  phone?: Phone;
  phone_number: string;
  signature_base64: string; // base64 문자열
};

// 요일 ENUM
export enum DayOfWeek {
  WEEKDAYS = 'WEEKDAYS',
  WEEKEND = 'WEEKEND',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
  NEGOTIABLE = 'NEGOTIABLE',
}

// 지불 방법 ENUM
export enum PaymentMethod {
  DIRECT = 'DIRECT',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

// 보험 종류 ENUM
export enum Insurance {
  EMPLOYMENT_INSURANCE = 'EMPLOYMENT_INSURANCE',
  WORKERS_COMPENSATION_INSURANCE = 'WORKERS_COMPENSATION_INSURANCE',
  NATIONAL_PENSION = 'NATIONAL_PENSION',
  HEALTH_INSURANCE = 'HEALTH_INSURANCE',
}

// 근무 시간 타입
export type WorkDayTime = {
  day_of_week: DayOfWeek;
  work_start_time: string | null; // HH:MM 형식
  work_end_time: string | null; // HH:MM 형식
};

// 휴식시간 포함된 근무시간 타입
export type WorkDayTimeWithRest = {
  day_of_week: DayOfWeek;
  work_start_time: string | null; // HH:MM 형식
  work_end_time: string | null; // HH:MM 형식
  break_start_time: string;
  break_end_time: string;
};

// 근로 계약서 고용주 정보
export type LaborContractEmployerInfo = {
  company_name: string;
  company_registration_number: string;
  phone_number: string;
  name: string;
  start_date: string; // yyyy-MM-dd 형식
  end_date: string; // yyyy-MM-dd 형식
  address: GiggleAddress;
  description: string;
  work_day_time_list: WorkDayTimeWithRest[];
  weekly_last_days: DayOfWeek[];
  hourly_rate: number;
  bonus: number | null; // optional
  additional_salary: number | null; // optional
  wage_rate: number;
  payment_day: number;
  payment_method: PaymentMethod;
  insurance: Insurance[];
  signature_base64: string; // base64 문자열
  phone?: Phone;
};

// 근로계약서 고용주 정보 속성명 enum
export enum LaborContractEmployerInfoProperty {
  COMPANY_NAME = 'company_name',
  COMPANY_REGISTRATION_NUMBER = 'company_registration_number',
  NAME = 'name',
  PHONE_NUMBER = 'phone_number',
  START_DATE = 'start_date', // yyyy-MM-dd format
  END_DATE = 'end_date', // yyyy-MM-dd format
  ADDRESS = 'address',
  DESCRIPTION = 'description',
  WORK_DAY_TIME_LIST = 'work_day_time_list',
  WEEKLY_LAST_DAYS = 'weekly_last_days',
  HOURLY_RATE = 'hourly_rate',
  BONUS = 'bonus', // optional
  ADDITIONAL_SALARY = 'additional_salary', // optional
  WAGE_RATE = 'wage_rate',
  PAYMENT_DAY = 'payment_day',
  PAYMENT_METHOD = 'payment_method',
  INSURANCE = 'insurance',
  SIGNATURE_BASE64 = 'signature_base64', // base64 string
}

// 통합신청서 데이터 양식
export type IntegratedApplicationData = {
  first_name: string;
  last_name: string;
  birth: string; // format: yyyy-MM-dd
  gender: Gender;
  nationality: string;
  tele_phone_number: string;
  cell_phone_number: string;
  is_accredited: boolean;
  school_name: string;
  school_phone_number: string;
  new_work_place_name: string;
  new_work_place_registration_number: string;
  new_work_place_phone_number: string;
  annual_income_amount: number;
  occupation: string;
  email: string;
  signature_base64: string;
  address: GiggleAddress;
  tele_phone?: Phone;
  cell_phone?: Phone;
  new_work_place_phone?: Phone;
  school_phone?: Phone;
};

export enum IntegratedApplicationField {
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  BIRTH = 'birth',
  GENDER = 'gender',
  NATIONALITY = 'nationality',
  TELE_PHONE_NUMBER = 'tele_phone_number',
  CELL_PHONE_NUMBER = 'cell_phone_number',
  IS_ACCREDITED = 'is_accredited',
  SCHOOL_NAME = 'school_name',
  SCHOOL_PHONE_NUMBER = 'school_phone_number',
  NEW_WORK_PLACE_NAME = 'new_work_place_name',
  NEW_WORK_PLACE_REGISTRATION_NUMBER = 'new_work_place_registration_number',
  NEW_WORK_PLACE_PHONE_NUMBER = 'new_work_place_phone_number',
  ANNUAL_INCOME_AMOUNT = 'annual_income_amount',
  OCCUPATION = 'occupation',
  EMAIL = 'email',
  SIGNATURE_BASE64 = 'signature_base64',
  ADDRESS = 'address',
}

export type School = {
  id: number;
  name: string;
  phone_number: string;
};

export type SearchSchoolResponse = {
  school_list: School[];
  has_next: boolean;
};

export enum WorkPeriod {
  ONE_DAY = 'ONE_DAY',
  LESS_THAN_ONE_WEEK = 'LESS_THAN_ONE_WEEK',
  ONE_WEEK_TO_ONE_MONTH = 'ONE_WEEK_TO_ONE_MONTH',
  ONE_MONTH_TO_THREE_MONTHS = 'ONE_MONTH_TO_THREE_MONTHS',
  THREE_MONTHS_TO_SIX_MONTHS = 'THREE_MONTHS_TO_SIX_MONTHS',
  SIX_MONTHS_TO_ONE_YEAR = 'SIX_MONTHS_TO_ONE_YEAR',
  MORE_THAN_ONE_YEAR = 'MORE_THAN_ONE_YEAR',
}

// 값 변환 핸들러 타입 정의
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValueTransformer<T = any> = {
  // 화면에 표시될 값을 저장 형식으로 변환 (예: 'Male' → 'MALE' 또는 'Accredited...' → true)
  transformValue: (selectedOption: string) => T;
  // 저장된 값과 옵션 항목을 비교하는 함수 (예: 'MALE'과 'Male' 비교, true와 'Accredited...' 비교)
  compareValue: (currentValue: T, option: string) => boolean;
};
