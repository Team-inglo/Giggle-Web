import { Address } from '@/types/api/users';

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
  pdf_url?: string;
  hwp_url?: string;
  word_url?: string;
  status?: DocumentStatus;
};

// 통합 신청서 타입
export type IntegratedApplicationInfo = {
  id: number;
  pdf_url?: string;
  hwp_url?: string;
  word_url?: string;
};

// 문서 상태 조회 응답 양식
export type DocumentsSummaryResponse = {
  part_time_employment_permits?: DocumentInfo;
  standard_labor_contract?: DocumentInfo;
  integrated_application?: DocumentInfo;
};

// 문서 종류 property와 이름 mapping
export enum DocumentType {
  PART_TIME_PERMIT = 'part_time_employment_permits',
  LABOR_CONTRACT = 'standard_labor_contract',
  INTEGRATED_APPLICATION = 'integrated_application',
}

// 시간제취업 허가서
export type EmployeeInformation = {
  first_name: string;
  last_name: string;
  major: string;
  term_of_completion: number;
  phone_number: string;
  email: string;
};

// 고용주 정보 property와 이름 mapping
export enum EmployerInfoProperty {
  COMPANY_NAME = 'company_name',
  COMPANY_REGISTRATION_NUMBER = 'company_registration_number',
  JOB_TYPE = 'job_type',
  ADDRESS = 'address',
}

// 고용주 정보 타입
export type EmployerInformation = {
  company_name?: string;
  company_registration_number?: string;
  job_type?: string;
  address?: Address;
};

// 시간제 근무 허가서 조회 응답 양식
export type PartTimePermitData = {
  employee_information: EmployeeInformation;
  employer_information?: EmployerInformation;
};

// 시간제 근무 허가서 작성 양식
export type PartTimePermitFormRequest = {
  first_name: string;
  last_name: string;
  major: string;
  term_of_completion: number;
  phone_number: string;
  email: string;
};

// 근로 계약서 조회 응답 양식
export type LaborContractDataResponse = {
  employee_information: LaborContractEmployeeInfo;
  employer_information?: LaborContractEmployerInfo;
};

// 근로 계약서 작성 양식
export type LaborContractEmployeeInfo = {
  first_name: string;
  last_name: string;
  address: Address;
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
  work_start_time: string; // HH:MM 형식
  work_end_time: string; // HH:MM 형식
  break_start_time: string; // HH:MM 형식
  break_end_time: string; // HH:MM 형식
};

// 근로 계약서 고용주 정보
export type LaborContractEmployerInfo = {
  company_name: string;
  name: string;
  start_date: string; // yyyy-MM-dd 형식
  end_date: string; // yyyy-MM-dd 형식
  address: Address;
  description: string;
  work_day_time_list: WorkDayTime[];
  weekly_last_days: DayOfWeek[];
  hourly_rate: number;
  bonus?: number; // optional
  additional_salary?: number; // optional
  wage_rate: number;
  payment_day: number;
  payment_method: PaymentMethod;
  insurance: Insurance;
  signature_base64: string; // base64 문자열
};

// 근로계약서 고용주 정보 속성명 enum
export enum LaborContractEmployerInfoProperty {
  COMPANY_NAME = 'company_name',
  NAME = 'name',
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