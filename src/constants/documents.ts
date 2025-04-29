import {
  PartTimeEmployeeInfoProperty,
  Insurance,
  IntegratedApplicationData,
  LaborContractEmployerInfo,
  LaborContractEmployerInfoProperty,
  PaymentMethod,
  WorkPeriod,
  IntegratedApplicationField,
  ValueTransformer,
  EmployerInformation,
} from '@/types/api/document';
import {
  DocumentType,
  EmployerInfoProperty,
  LaborContractEmployeeInfo,
  PartTimePermitFormRequest,
} from '@/types/api/document';
import { Gender } from '@/types/api/users';
import { country } from './information';
import { transformers } from '@/utils/document';

// 문서 타입별 정보를 담은 객체
export const DocumentTypeInfo = {
  [DocumentType.PART_TIME_PERMIT]: {
    name: 'Part-Time Work Permit Form',
    key: 'part_time_employment_permits',
  },
  [DocumentType.LABOR_CONTRACT]: {
    name: 'Employment Contract',
    key: 'standard_labor_contract',
  },
  [DocumentType.INTEGRATED_APPLICATION]: {
    name: 'Integrated Application Form',
    key: 'integrated_application',
  },
} as const;

export const EmployerDocumentTypeInfo = {
  [DocumentType.PART_TIME_PERMIT]: {
    name: '시간제 취업 허가서',
    key: 'part_time_employment_permits',
  },
  [DocumentType.LABOR_CONTRACT]: {
    name: '표준 근로 계약서',
    key: 'standard_labor_contract',
  },
  [DocumentType.INTEGRATED_APPLICATION]: {
    name: 'Integrated Application Form',
    key: 'integrated_application',
  },
} as const;

export const DocumentSubTitleContent = {
  [DocumentType.PART_TIME_PERMIT]: {
    student: {
      name: 'Part-Time Employment Permit',
      key: 'part_time_employment_permits',
      content:
        "International students must have the applicable permit to work part-time. If you don't get permission, you can become an illegal resident.",
    },
    employer: {
      name: '취업허가서를 작성해주세요 ✍',
      key: 'part_time_employment_permits',
      content:
        '시간제 근무를 하려면 유학생은 취업허가서를 소지해야 해요. 만약 허가 없이 근무할 경우, 고용주에게도 불이익이 발생할 수 있어요. 안전한 채용을 위해 꼭 확인해 주세요!',
    },
  },
  [DocumentType.LABOR_CONTRACT]: {
    student: {
      name: 'Standard labor contract for short-time workers',
      key: 'standard_labor_contract',
      content:
        'Regardless of the type of employment, all workers are required to write an employment contract, which allows them to maintain a legal and transparent employment relationship.',
    },
    employer: {
      name: '표준근로계약서를 작성해주세요 ✍',
      key: 'standard_labor_contract',
      content:
        '고용 형태와 관계없이 모든 근로자는 근로계약서를 작성해야 해요. 이는 법적으로 필수 사항이며, 근로계약서를 작성하지 않으면 500만원 이하 벌금이 부과될 수 있어요.',
    },
  },
  [DocumentType.INTEGRATED_APPLICATION]: {
    student: {
      name: 'Application Form',
      key: 'integrated_application',
      content:
        'The Application Form is a required document that international students must submit to legally work part-time in Korea. This form reports the workplace and working conditions, allowing the student to obtain employment approval.',
    },
    employer: {
      name: 'Application Form',
      key: 'integrated_application',
      content:
        'The Application Form is a required document that international students must submit to legally work part-time in Korea. This form reports the workplace and working conditions, allowing the student to obtain employment approval.',
    },
  },
} as const;

// 시간제 근무 enum 정의
export enum PartTimePermitFormProperty {
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  MAJOR = 'major',
  TERM_OF_COMPLETION = 'term_of_completion',
  PHONE_NUMBER = 'phone_number',
  EMAIL = 'email',
}

export const enum DocumentStatusEmployer {
  TEMPORARY_SAVE = 'TEMPORARY_SAVE',
  SUBMITTED = 'SUBMITTED',
  REWRITING = 'REWRITING',
  CONFIRMATION = 'CONFIRMATION',
}

// 시간제 근무 매핑 객체
export const PartTimePermitFormInfo = {
  [PartTimePermitFormProperty.FIRST_NAME]: {
    name: 'First name',
    ko: '이름',
    key: 'first_name',
  },
  [PartTimePermitFormProperty.LAST_NAME]: {
    name: 'Last name',
    ko: '성',
    key: 'last_name',
  },
  [PartTimePermitFormProperty.MAJOR]: {
    name: 'Major',
    ko: '전공',
    key: 'major',
  },
  [PartTimePermitFormProperty.TERM_OF_COMPLETION]: {
    name: 'Term of completion',
    ko: '이수학기',
    key: 'term_of_completion',
  },
  [PartTimePermitFormProperty.PHONE_NUMBER]: {
    name: 'Phone number',
    ko: '전화번호',
    key: 'phone_number',
  },
  [PartTimePermitFormProperty.EMAIL]: {
    name: 'Email',
    ko: '이메일',
    key: 'email',
  },
} as const;

// 시간제근무 허가 신청서 초기 state
export const initialPartTimePermitForm: PartTimePermitFormRequest = {
  first_name: '',
  last_name: '',
  major: '',
  term_of_completion: 0,
  phone_number: '',
  phone: {
    start: '010',
    middle: '',
    end: '',
  },
  email: '',
};

// 시간제 근무 허가서 내 고용주 입력 정보 속성과 이름 mapping
export const PartTimeEmployPermitEmployerInfo = {
  [EmployerInfoProperty.COMPANY_NAME]: {
    name: 'Company name',
    ko: '업체명',
    key: 'company_name',
  },
  [EmployerInfoProperty.COMPANY_REGISTRATION_NUMBER]: {
    name: 'Business registration number',
    ko: '사업자등록번호',
    key: 'company_registration_number',
  },
  [EmployerInfoProperty.JOB_TYPE]: {
    name: 'Industry',
    ko: '업종',
    key: 'job_type',
  },
  [EmployerInfoProperty.NAME]: {
    name: 'Representative',
    ko: '대표자 이름',
    key: 'name',
  },
  [EmployerInfoProperty.PHONE_NUMBER]: {
    name: 'Phone number',
    ko: '전화번호',
    key: 'phone_number',
  },
  [EmployerInfoProperty.SIGNATURE_BASE64]: {
    name: "Representative's signature",
    ko: '서명',
    key: 'signature_base64',
  },
  [EmployerInfoProperty.WORK_PERIOD]: {
    name: 'Work period',
    ko: '근무 기간',
    key: 'work_period',
  },
  [EmployerInfoProperty.HOURLY_RATE]: {
    name: 'Hourly rate',
    ko: '시급',
    key: 'hourly_rate',
  },
  [EmployerInfoProperty.WORK_DAYS_WEEKDAYS]: {
    name: 'Weekday work hours',
    ko: '평일 근무일시',
    key: 'work_days_weekdays',
  },
  [EmployerInfoProperty.WORK_DAYS_WEEKENDS]: {
    name: 'Weekend work hours',
    ko: '주말 근무일시',
    key: 'work_days_weekends',
  },
  [EmployerInfoProperty.ADDRESS]: {
    name: 'Address in Korea',
    ko: '주소',
    key: 'address',
  },
} as const;

// 표준 근로계약서 내 고용주 입력 정보 속성과 이름 mapping
export const LaborContractEmployerInfoNameMap = {
  [LaborContractEmployerInfoProperty.COMPANY_NAME]: {
    name: 'Company name',
    ko: '업체명',
    key: 'company_name',
  },
  [LaborContractEmployerInfoProperty.COMPANY_REGISTRATION_NUMBER]: {
    name: 'Company Registration Number',
    ko: '사업자등록번호',
    key: 'company_registration_number',
  },
  [LaborContractEmployerInfoProperty.PHONE_NUMBER]: {
    name: 'Company Phone Number',
    ko: '',
    key: 'phone_number',
  },
  [LaborContractEmployerInfoProperty.NAME]: {
    name: 'Representative name',
    ko: '대표자 이름',
    key: 'name',
  },
  [LaborContractEmployerInfoProperty.START_DATE]: {
    name: 'Work start date',
    ko: '근무 시작일',
    key: 'start_date',
  },
  [LaborContractEmployerInfoProperty.END_DATE]: {
    name: 'Work end date',
    ko: '근무 종료일',
    key: 'end_date',
  },
  [LaborContractEmployerInfoProperty.ADDRESS]: {
    name: 'Work place address',
    ko: '근무지 주소',
    key: 'address',
  },
  [LaborContractEmployerInfoProperty.DESCRIPTION]: {
    name: 'Work details',
    ko: '상세 업무 내용',
    key: 'description',
  },
  [LaborContractEmployerInfoProperty.WORK_DAY_TIME_LIST]: {
    name: 'Working days and working hours by working days',
    ko: '근무일시',
    key: 'work_day_time_list',
  },
  [LaborContractEmployerInfoProperty.WEEKLY_LAST_DAYS]: {
    name: 'Weekly holidays',
    ko: '주휴일',
    key: 'weekly_last_days',
  },
  [LaborContractEmployerInfoProperty.HOURLY_RATE]: {
    name: 'Hourly pay',
    ko: '시급',
    key: 'hourly_rate',
  },
  [LaborContractEmployerInfoProperty.BONUS]: {
    name: 'Bonuses',
    ko: '상여금',
    key: 'bonus',
  },
  [LaborContractEmployerInfoProperty.ADDITIONAL_SALARY]: {
    name: 'Other benefits (such as allowances)',
    ko: '기타급여(제수당 등)',
    key: 'additional_salary',
  },
  [LaborContractEmployerInfoProperty.WAGE_RATE]: {
    name: 'Additional wage rate for overtime work',
    ko: '초과근무수당',
    key: 'wage_rate',
  },
  [LaborContractEmployerInfoProperty.PAYMENT_DAY]: {
    name: 'Wage payment date',
    ko: '급여지급일',
    key: 'payment_day',
  },
  [LaborContractEmployerInfoProperty.PAYMENT_METHOD]: {
    name: 'Wage payment method',
    ko: '급여지급방식',
    key: 'payment_method',
  },
  [LaborContractEmployerInfoProperty.INSURANCE]: {
    name: 'Social insurance coverage',
    ko: '보험',
    key: 'insurance',
  },
  [LaborContractEmployerInfoProperty.SIGNATURE_BASE64]: {
    name: "Representative's signature",
    ko: '대표자 서명',
    key: 'signature_base64',
  },
} as const;

// 고용주 표준근로계약서 초기 state
export const initialLaborContractEmployerInfo: LaborContractEmployerInfo = {
  company_name: '',
  company_registration_number: '',
  phone_number: '',
  phone: {
    start: '010',
    middle: '',
    end: '',
  },
  name: '',
  start_date: '', // yyyy-MM-dd
  end_date: '', // yyyy-MM-dd
  address: {
    address_name: '',
    region_1depth_name: '',
    region_2depth_name: '',
    region_3depth_name: '',
    region_4depth_name: '',
    address_detail: '',
    longitude: 0,
    latitude: 0,
  },
  description: '',
  work_day_time_list: [],
  weekly_last_days: [],
  hourly_rate: 0,
  bonus: null,
  additional_salary: null,
  wage_rate: 0,
  payment_day: 1, // 기본값을 1일로 설정
  payment_method: PaymentMethod.BANK_TRANSFER, // 기본값을 계좌이체로 설정
  insurance: [Insurance.WORKERS_COMPENSATION_INSURANCE], // 기본값을 산재보험으로 설정
  signature_base64: '',
};

// 표준 계약서 property enum
export enum LaborContractEmployeeInfoProperty {
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  ADDRESS = 'address',
  PHONE_NUMBER = 'phone_number',
  SIGNATURE_BASE64 = 'signature_base64',
}

// 표준계약서 정보 매핑
export const LaborContractEmployeeFormInfo = {
  [LaborContractEmployeeInfoProperty.FIRST_NAME]: {
    name: 'First name',
    ko: '이름',
    key: 'first_name',
  },
  [LaborContractEmployeeInfoProperty.LAST_NAME]: {
    name: 'Last name',
    ko: '성',
    key: 'last_name',
  },
  [LaborContractEmployeeInfoProperty.PHONE_NUMBER]: {
    name: 'Phone number',
    ko: '전화번호',
    key: 'phone_number',
  },
  [LaborContractEmployeeInfoProperty.SIGNATURE_BASE64]: {
    name: 'Signature',
    ko: '서명',
    key: 'signature_base64',
  },
  [LaborContractEmployeeInfoProperty.ADDRESS]: {
    name: 'Address',
    ko: '주소',
    key: 'address',
  },
} as const;

// 표준계약서 초기 state
export const initialLaborContractEmployeeInfo: LaborContractEmployeeInfo = {
  first_name: '',
  last_name: '',
  address: {
    address_name: '',
    region_1depth_name: '',
    region_2depth_name: '',
    region_3depth_name: '',
    region_4depth_name: '',
    address_detail: '',
    longitude: 0,
    latitude: 0,
  },
  phone_number: '',
  phone: {
    start: '010',
    middle: '',
    end: '',
  },
  signature_base64: '',
};

// 통합신청서 초기 state
export const initialIntegratedApplication: IntegratedApplicationData = {
  first_name: '',
  last_name: '',
  birth: '',
  gender: Gender.MALE,
  nationality: '',
  tele_phone_number: '',
  tele_phone: {
    start: '010',
    middle: '',
    end: '',
  },
  cell_phone_number: '',
  cell_phone: {
    start: '010',
    middle: '',
    end: '',
  },
  is_accredited: true,
  school_name: '',
  school_phone_number: '',
  school_phone: {
    start: '010',
    middle: '',
    end: '',
  },
  new_work_place_name: '',
  new_work_place_registration_number: '',
  new_work_place_phone_number: '',
  new_work_place_phone: {
    start: '010',
    middle: '',
    end: '',
  },
  annual_income_amount: 0,
  occupation: '',
  email: '',
  signature_base64: '',
  address: {
    address_name: '',
    region_1depth_name: '',
    region_2depth_name: '',
    region_3depth_name: '',
    region_4depth_name: '',
    address_detail: '',
    longitude: 0,
    latitude: 0,
  },
};

// 고용주 시간제 근무 허가서 작성 시 유학생 정보 name 매핑
export const EmployeePropertyInfo = {
  [PartTimeEmployeeInfoProperty.FIRST_NAME]: {
    name: '이름',
  },
  [PartTimeEmployeeInfoProperty.LAST_NAME]: {
    name: '성',
  },
  [PartTimeEmployeeInfoProperty.MAJOR]: {
    name: '학과(전공)',
  },
  [PartTimeEmployeeInfoProperty.TERM_OF_COMPLETION]: {
    name: '이수학기',
  },
  [PartTimeEmployeeInfoProperty.PHONE_NUMBER]: {
    name: '전화번호',
  },
  [PartTimeEmployeeInfoProperty.EMAIL]: {
    name: '이메일',
  },
} as const;

// 고용주 근로계약서 작성 시 유학생 정보 name 매핑
export const LaborContractEmployeePropertyInfo = {
  [LaborContractEmployeeInfoProperty.FIRST_NAME]: {
    name: '이름',
  },
  [LaborContractEmployeeInfoProperty.LAST_NAME]: {
    name: '성',
  },
  [LaborContractEmployeeInfoProperty.ADDRESS]: {
    name: '한국 주소',
  },
  [LaborContractEmployeeInfoProperty.PHONE_NUMBER]: {
    name: '휴대전화',
  },
  [LaborContractEmployeeInfoProperty.SIGNATURE_BASE64]: {
    name: '서명',
  },
} as const;

// 통합신청서 작성 시 정보와 이름 매핑
export const IntegratedApplicationPropertyInfo = {
  [IntegratedApplicationField.FIRST_NAME]: {
    name: 'First Name',
    ko: '이름',
  },
  [IntegratedApplicationField.LAST_NAME]: {
    name: 'Last Name',
    ko: '성',
  },
  [IntegratedApplicationField.BIRTH]: {
    name: 'Date of Birth',
    ko: '생년월일',
  },
  [IntegratedApplicationField.GENDER]: {
    name: 'Gender',
    ko: '성별',
  },
  [IntegratedApplicationField.NATIONALITY]: {
    name: 'Nationality',
    ko: '국적',
  },
  [IntegratedApplicationField.ADDRESS]: {
    name: 'Address in Korea',
    ko: '한국 주소',
  },
  [IntegratedApplicationField.TELE_PHONE_NUMBER]: {
    name: 'Telephone Number',
    ko: '전화번호',
  },
  [IntegratedApplicationField.CELL_PHONE_NUMBER]: {
    name: 'Cell Phone Number',
    ko: '휴대전화',
  },
  [IntegratedApplicationField.IS_ACCREDITED]: {
    name: 'Type Of Name',
    ko: '인증 여부',
  },
  [IntegratedApplicationField.SCHOOL_NAME]: {
    name: 'School Name',
    ko: '학교명',
  },
  [IntegratedApplicationField.SCHOOL_PHONE_NUMBER]: {
    name: 'Phone Number Of School',
    ko: '학교 전화번호',
  },
  [IntegratedApplicationField.NEW_WORK_PLACE_NAME]: {
    name: 'New Workplace',
    ko: '근무처명',
  },
  [IntegratedApplicationField.NEW_WORK_PLACE_REGISTRATION_NUMBER]: {
    name: 'Business Registration Number No. Of New Workplace',
    ko: '사업자등록번호',
  },
  [IntegratedApplicationField.NEW_WORK_PLACE_PHONE_NUMBER]: {
    name: 'Phone Number Of New Workplace',
    ko: '근무처 전화번호',
  },
  [IntegratedApplicationField.ANNUAL_INCOME_AMOUNT]: {
    name: 'Annual Income Amount',
    ko: '연간 소득액',
  },
  [IntegratedApplicationField.OCCUPATION]: {
    name: 'Occupation',
    ko: '직종',
  },
  [IntegratedApplicationField.EMAIL]: {
    name: 'Email',
    ko: '이메일',
  },
  [IntegratedApplicationField.SIGNATURE_BASE64]: {
    name: 'Applicant Signature',
    ko: '서명',
  },
} as const;

// 고용주 시간제 근무 허가서 초기 state
export const initialPartTimePermitEmployerForm = {
  company_name: '',
  company_registration_number: '',
  job_type: '',
  name: '',
  phone_number: '',
  phone: {
    start: '010',
    middle: '',
    end: '',
  },
  signature_base64: '',
  work_period: WorkPeriod.ONE_DAY,
  hourly_rate: 0,
  work_days_weekdays: null,
  work_days_weekends: null,
  address: {
    address_name: '',
    region_1depth_name: '',
    region_2depth_name: '',
    region_3depth_name: '',
    region_4depth_name: '',
    address_detail: '',
    longitude: 0,
    latitude: 0,
  },
};

// 근무 기간 이름 과 property 매핑
export const WorkPeriodInfo = {
  [WorkPeriod.ONE_DAY]: {
    name: '하루',
  },
  [WorkPeriod.LESS_THAN_ONE_WEEK]: {
    name: '1주 미만',
  },
  [WorkPeriod.ONE_WEEK_TO_ONE_MONTH]: {
    name: '1주 ~ 1개월',
  },
  [WorkPeriod.ONE_MONTH_TO_THREE_MONTHS]: {
    name: '1개월 ~ 3개월',
  },
  [WorkPeriod.THREE_MONTHS_TO_SIX_MONTHS]: {
    name: '3개월 ~ 6개월',
  },
  [WorkPeriod.SIX_MONTHS_TO_ONE_YEAR]: {
    name: '6개월 ~ 1년',
  },
  [WorkPeriod.MORE_THAN_ONE_YEAR]: {
    name: '1년 이상',
  },
} as const;

// 근무 기간 리스트
export const WorkPeriodNames = [
  '하루',
  '1주 미만',
  '1주 ~ 1개월',
  '1개월 ~ 3개월',
  '3개월 ~ 6개월',
  '6개월 ~ 1년',
  '1년 이상',
];

export const DAYS = {
  ['월요일']: 'MONDAY',
  ['화요일']: 'TUESDAY',
  ['수요일']: 'WEDNESDAY',
  ['목요일']: 'THURSDAY',
  ['금요일']: 'FRIDAY',
  ['토요일']: 'SATURDAY',
  ['일요일']: 'SUNDAY',
} as const;

export const InsuranceInfo = {
  [Insurance.EMPLOYMENT_INSURANCE]: {
    name: '고용보험',
    key: 'EMPLOYMENT_INSURANCE',
  },
  [Insurance.WORKERS_COMPENSATION_INSURANCE]: {
    name: '산재보험',
    key: 'WORKERS_COMPENSATION_INSURANCE',
  },
  [Insurance.NATIONAL_PENSION]: {
    name: '국민연금',
    key: 'NATIONAL_PENSION',
  },
  [Insurance.HEALTH_INSURANCE]: {
    name: '건강보험',
    key: 'HEALTH_INSURANCE',
  },
} as const;

export const personalInfoList = [
  'Applicant Signature',
  'Passport number, passport issuance date, passport expiration date',
  'Address, Phone Number, in Home Country',
  'Current Workplace Of Name, Business Registration no., Phone Number',
  'Spouse of applicant Signature',
  'Parents of applicant',
];

// 시간제 근로 허가서 폼 필드 타입 정의
export type PartTimePermitFormField = {
  type: 'text' | 'phone' | 'dropdown';
  name: keyof PartTimePermitFormRequest | 'phone';
  title: string;
  placeholder: string;
  options?: string[];
  format?: string;
  description?: string;
  isUnit?: boolean;
  unit?: string;
  isPrefix?: boolean;
  prefix?: string;
  label?: string;
};

// 시간제 근로 허가서 폼 필드 정의
export const PartTimePermitFormFields: PartTimePermitFormField[] = [
  {
    type: 'text',
    name: PartTimePermitFormProperty.FIRST_NAME,
    title: PartTimePermitFormInfo[PartTimePermitFormProperty.FIRST_NAME].name,
    placeholder: 'First Name',
  },
  {
    type: 'text',
    name: PartTimePermitFormProperty.LAST_NAME,
    title: PartTimePermitFormInfo[PartTimePermitFormProperty.LAST_NAME].name,
    placeholder: 'Last Name',
  },
  {
    type: 'phone',
    name: 'phone',
    title: PartTimePermitFormInfo[PartTimePermitFormProperty.PHONE_NUMBER].name,
    placeholder: '', // PhoneNumberInput에서 자체적으로 처리
  },
  {
    type: 'text',
    name: PartTimePermitFormProperty.MAJOR,
    title: PartTimePermitFormInfo[PartTimePermitFormProperty.MAJOR].name,
    placeholder: 'Department (major)',
  },
  {
    type: 'dropdown',
    name: PartTimePermitFormProperty.TERM_OF_COMPLETION,
    title:
      PartTimePermitFormInfo[PartTimePermitFormProperty.TERM_OF_COMPLETION]
        .name,
    placeholder: 'Term of completion',
    options: Array.from({ length: 12 }, (_, i) => String(i + 1)),
  },
  {
    type: 'text',
    name: PartTimePermitFormProperty.EMAIL,
    title: PartTimePermitFormInfo[PartTimePermitFormProperty.EMAIL].name,
    placeholder: 'email@email.com',
  },
];

// 표준근로계약서 폼 필드 타입 정의
export type LaborContractFormField = {
  type: 'text' | 'phone' | 'address' | 'signature';
  name: keyof LaborContractEmployeeInfo | 'phone';
  title: string;
  placeholder: string;
  options?: string[];
  format?: string;
  description?: string;
  isUnit?: boolean;
  unit?: string;
  isPrefix?: boolean;
  prefix?: string;
  label?: string;
};

// 표준근로계약서 폼 필드 정의
export const LaborContractFormFields: LaborContractFormField[] = [
  {
    type: 'text',
    name: LaborContractEmployeeInfoProperty.FIRST_NAME,
    title:
      LaborContractEmployeeFormInfo[
        LaborContractEmployeeInfoProperty.FIRST_NAME
      ].name,
    placeholder: 'First Name',
  },
  {
    type: 'text',
    name: LaborContractEmployeeInfoProperty.LAST_NAME,
    title:
      LaborContractEmployeeFormInfo[LaborContractEmployeeInfoProperty.LAST_NAME]
        .name,
    placeholder: 'Last Name',
  },
  {
    type: 'phone',
    name: 'phone',
    title:
      LaborContractEmployeeFormInfo[
        LaborContractEmployeeInfoProperty.PHONE_NUMBER
      ].name,
    placeholder: '', // PhoneNumberInput에서 자체적으로 처리
  },
  {
    type: 'address',
    name: LaborContractEmployeeInfoProperty.ADDRESS,
    title:
      LaborContractEmployeeFormInfo[LaborContractEmployeeInfoProperty.ADDRESS]
        .name,
    placeholder: 'Search Your Address',
  },
  {
    type: 'signature',
    name: LaborContractEmployeeInfoProperty.SIGNATURE_BASE64,
    title:
      LaborContractEmployeeFormInfo[
        LaborContractEmployeeInfoProperty.SIGNATURE_BASE64
      ].name,
    placeholder: 'Signature',
  },
];

// 통합신청서 필수 검증 필드 목록
export const REQUIRED_FIELDS: Array<keyof IntegratedApplicationData> = [
  'first_name',
  'last_name',
  'tele_phone',
  'cell_phone',
  'school_phone',
  'nationality',
  'new_work_place_phone',
  'school_name',
  'new_work_place_registration_number',
  'annual_income_amount',
  'occupation',
  'email',
  'address',
  'signature_base64',
];

// 통합신청서 폼 필드 타입 정의
export type IntegratedApplicationFormField = {
  type:
    | 'text'
    | 'phone'
    | 'address'
    | 'dropdown'
    | 'radio'
    | 'signature'
    | 'school_name';
  name: keyof IntegratedApplicationData;
  title: string;
  placeholder: string;
  description?: string;
  options?: string[];
  format?: string;
  transformer?: ValueTransformer;
  isRequired?: boolean;
  isUnit?: boolean;
  unit?: string;
  isPrefix?: boolean;
  prefix?: string;
  label?: string;
};

// 통합신청서 폼 필드 정의
export const IntegratedApplicationformFields: IntegratedApplicationFormField[] =
  [
    {
      type: 'text',
      name: IntegratedApplicationField.FIRST_NAME,
      title:
        IntegratedApplicationPropertyInfo[IntegratedApplicationField.FIRST_NAME]
          .name,
      placeholder: 'First Name',
    },
    {
      type: 'text',
      name: IntegratedApplicationField.LAST_NAME,
      title:
        IntegratedApplicationPropertyInfo[IntegratedApplicationField.LAST_NAME]
          .name,
      placeholder: 'Last Name',
    },
    {
      type: 'text',
      name: IntegratedApplicationField.BIRTH,
      title:
        IntegratedApplicationPropertyInfo[IntegratedApplicationField.BIRTH]
          .name,
      placeholder: 'Date Of Birth',
      format: 'date',
    },
    {
      type: 'radio',
      name: IntegratedApplicationField.GENDER,
      title:
        IntegratedApplicationPropertyInfo[IntegratedApplicationField.GENDER]
          .name,
      placeholder: 'Gender',
      options: ['Male', 'Female'],
      transformer: transformers.gender,
    },
    {
      type: 'dropdown',
      name: IntegratedApplicationField.NATIONALITY,
      title:
        IntegratedApplicationPropertyInfo[
          IntegratedApplicationField.NATIONALITY
        ].name,
      placeholder: 'Nationality',
      options: country,
    },
    {
      type: 'phone',
      name: 'tele_phone',
      title:
        IntegratedApplicationPropertyInfo[
          IntegratedApplicationField.TELE_PHONE_NUMBER
        ].name,
      placeholder: 'Telephone No.',
      format: 'numbers-only',
    },
    {
      type: 'phone',
      name: 'cell_phone',
      title:
        IntegratedApplicationPropertyInfo[
          IntegratedApplicationField.CELL_PHONE_NUMBER
        ].name,
      placeholder: 'Cell Phone No.',
      format: 'numbers-only',
    },
    {
      type: 'address',
      name: IntegratedApplicationField.ADDRESS,
      title:
        IntegratedApplicationPropertyInfo[IntegratedApplicationField.ADDRESS]
          .name,
      placeholder: 'Address in Korea',
    },
    {
      type: 'radio',
      name: IntegratedApplicationField.IS_ACCREDITED,
      title:
        IntegratedApplicationPropertyInfo[
          IntegratedApplicationField.IS_ACCREDITED
        ].name,
      placeholder: 'Type Of Name',
      options: [
        'Accredited by Education Office',
        'Non-accredited, Alternative School',
      ],
      description: 'University is an education office accredited school.',
      transformer: transformers.boolean('Accredited by Education Office'),
    },
    {
      type: 'school_name',
      name: IntegratedApplicationField.SCHOOL_NAME,
      title:
        IntegratedApplicationPropertyInfo[
          IntegratedApplicationField.SCHOOL_NAME
        ].name,
      placeholder: 'Name Of School',
    },
    {
      type: 'phone',
      name: 'school_phone',
      title:
        IntegratedApplicationPropertyInfo[
          IntegratedApplicationField.SCHOOL_PHONE_NUMBER
        ].name,
      placeholder: 'Phone Number of School',
      format: 'numbers-only',
    },
    {
      type: 'text',
      name: IntegratedApplicationField.NEW_WORK_PLACE_NAME,
      title:
        IntegratedApplicationPropertyInfo[
          IntegratedApplicationField.NEW_WORK_PLACE_NAME
        ].name,
      placeholder: 'New Workplace',
    },
    {
      type: 'text',
      name: IntegratedApplicationField.NEW_WORK_PLACE_REGISTRATION_NUMBER,
      title:
        IntegratedApplicationPropertyInfo[
          IntegratedApplicationField.NEW_WORK_PLACE_REGISTRATION_NUMBER
        ].name,
      placeholder: 'Business Registration No. Of New Workplace',
      format: 'business-id',
    },
    {
      type: 'phone',
      name: 'new_work_place_phone',
      title:
        IntegratedApplicationPropertyInfo[
          IntegratedApplicationField.NEW_WORK_PLACE_PHONE_NUMBER
        ].name,
      placeholder: 'Phone Number Of New Workplace',
      format: 'numbers-only',
    },
    {
      type: 'text',
      name: IntegratedApplicationField.ANNUAL_INCOME_AMOUNT,
      title:
        IntegratedApplicationPropertyInfo[
          IntegratedApplicationField.ANNUAL_INCOME_AMOUNT
        ].name,
      placeholder: 'Annual Income Amount',
      format: 'numbers-only',
    },
    {
      type: 'text',
      name: IntegratedApplicationField.OCCUPATION,
      title:
        IntegratedApplicationPropertyInfo[IntegratedApplicationField.OCCUPATION]
          .name,
      placeholder: 'Occupation',
      description: `If you are a college student, please write 'student'`,
    },
    {
      type: 'text',
      name: IntegratedApplicationField.EMAIL,
      title:
        IntegratedApplicationPropertyInfo[IntegratedApplicationField.EMAIL]
          .name,
      placeholder: 'Email',
    },
    {
      type: 'signature',
      name: IntegratedApplicationField.SIGNATURE_BASE64,
      title:
        IntegratedApplicationPropertyInfo[
          IntegratedApplicationField.SIGNATURE_BASE64
        ].name,
      placeholder: 'Signature',
    },
  ];

export type CheckboxOption = {
  key: string;
  name: string;
};

// 표준근로계약서 고용주 폼 필드 타입 정의
export type LaborContractEmployerFormField = {
  type:
    | 'text'
    | 'phone'
    | 'address'
    | 'dropdown'
    | 'date'
    | 'signature'
    | 'textarea'
    | 'number'
    | 'work_schedule'
    | 'checkbox'
    | 'weekday_selector'
    | 'radio'
    | 'input_with_radio';
  name: keyof LaborContractEmployerInfo | 'phone';
  title: string;
  placeholder: string;
  description?: string;
  options?: string[];
  checkboxOptions?: CheckboxOption[];
  format?: string;
  transformer?: ValueTransformer;
  isRequired?: boolean;
  prefix?: string;
  isPrefix?: boolean;
  unit?: string;
  isUnit?: boolean;
  variant?: 'checkbox' | 'button';
  label?: string;
};

// 고용주 표준근로계약서 필수 검증 필드 목록
export const EMPLOYER_LABOR_CONTRACT_REQUIRED_FIELDS: Array<
  keyof LaborContractEmployerInfo
> = [
  'company_name',
  'company_registration_number',
  'phone',
  'name',
  'start_date',
  'end_date',
  'address',
  'description',
  'work_day_time_list',
  'weekly_last_days',
  'hourly_rate',
  'wage_rate',
  'payment_day',
  'payment_method',
  'insurance',
  'signature_base64',
];

// 표준근로계약서 고용주 폼 필드 정의
export const LaborContractEmployerFormFields: LaborContractEmployerFormField[] =
  [
    {
      type: 'text',
      name: LaborContractEmployerInfoProperty.COMPANY_NAME,
      title:
        LaborContractEmployerInfoNameMap[
          LaborContractEmployerInfoProperty.COMPANY_NAME
        ].ko,
      placeholder: '회사/점포명을 작성해주세요',
      isRequired: true,
    },
    {
      type: 'text',
      name: LaborContractEmployerInfoProperty.COMPANY_REGISTRATION_NUMBER,
      title:
        LaborContractEmployerInfoNameMap[
          LaborContractEmployerInfoProperty.COMPANY_REGISTRATION_NUMBER
        ].ko,
      placeholder: '사업자등록번호를 입력해주세요',
      format: 'business-id',
      isRequired: true,
    },
    {
      type: 'phone',
      name: 'phone',
      title:
        LaborContractEmployerInfoNameMap[
          LaborContractEmployerInfoProperty.PHONE_NUMBER
        ].ko || '사업체 전화번호',
      placeholder: '',
      isRequired: true,
    },
    {
      type: 'text',
      name: LaborContractEmployerInfoProperty.START_DATE,
      title:
        LaborContractEmployerInfoNameMap[
          LaborContractEmployerInfoProperty.START_DATE
        ].ko,
      placeholder: 'YYYY-MM-DD',
      format: 'date',
      isRequired: true,
    },
    {
      type: 'text',
      name: LaborContractEmployerInfoProperty.END_DATE,
      title:
        LaborContractEmployerInfoNameMap[
          LaborContractEmployerInfoProperty.END_DATE
        ].ko,
      placeholder: 'YYYY-MM-DD',
      format: 'date',
      isRequired: true,
    },
    {
      type: 'text',
      name: LaborContractEmployerInfoProperty.NAME,
      title:
        LaborContractEmployerInfoNameMap[LaborContractEmployerInfoProperty.NAME]
          .ko,
      placeholder: '이름을 작성해주세요',
      isRequired: true,
    },
    {
      type: 'address',
      name: LaborContractEmployerInfoProperty.ADDRESS,
      title:
        LaborContractEmployerInfoNameMap[
          LaborContractEmployerInfoProperty.ADDRESS
        ].ko,
      placeholder: '주소 검색',
      isRequired: true,
      label: '상세 주소',
    },
    {
      type: 'textarea',
      name: LaborContractEmployerInfoProperty.DESCRIPTION,
      title:
        LaborContractEmployerInfoNameMap[
          LaborContractEmployerInfoProperty.DESCRIPTION
        ].ko,
      placeholder: '업무의 내용을 작성해주세요',
      isRequired: true,
    },
    {
      type: 'work_schedule',
      name: LaborContractEmployerInfoProperty.WORK_DAY_TIME_LIST,
      title:
        LaborContractEmployerInfoNameMap[
          LaborContractEmployerInfoProperty.WORK_DAY_TIME_LIST
        ].ko,
      placeholder: '근무 시간',
      description: '원하는 근무 시간을 추가해주세요.',
      isRequired: true,
    },
    {
      type: 'checkbox',
      name: LaborContractEmployerInfoProperty.WEEKLY_LAST_DAYS,
      title:
        LaborContractEmployerInfoNameMap[
          LaborContractEmployerInfoProperty.WEEKLY_LAST_DAYS
        ].ko,
      placeholder: '주휴일',
      description: '다중 선택 가능합니다.',
      isRequired: true,
      checkboxOptions: Object.entries(DAYS).map(([koreanDay, englishDay]) => ({
        key: englishDay,
        name: koreanDay,
      })),
      variant: 'button',
    },
    {
      type: 'text',
      name: LaborContractEmployerInfoProperty.HOURLY_RATE,
      title:
        LaborContractEmployerInfoNameMap[
          LaborContractEmployerInfoProperty.HOURLY_RATE
        ].ko,
      placeholder: '시급을 입력해주세요',
      description: '2025년 최소 시급은 10,030원입니다.',
      format: 'numbers-only',
      isRequired: true,
      isUnit: true,
      unit: '원',
    },
    {
      type: 'input_with_radio',
      name: LaborContractEmployerInfoProperty.BONUS,
      title:
        LaborContractEmployerInfoNameMap[
          LaborContractEmployerInfoProperty.BONUS
        ].ko,
      placeholder: '0',
      options: ['있어요', '없어요'],
      format: 'numbers-only',
      isRequired: true,
      transformer: transformers.presence,
      isUnit: true,
      unit: '원',
    },
    {
      type: 'input_with_radio',
      name: LaborContractEmployerInfoProperty.ADDITIONAL_SALARY,
      title:
        LaborContractEmployerInfoNameMap[
          LaborContractEmployerInfoProperty.ADDITIONAL_SALARY
        ].ko,
      placeholder: '0',
      options: ['있어요', '없어요'],
      format: 'numbers-only',
      isRequired: true,
      transformer: transformers.presence,
      isUnit: true,
      unit: '원',
    },
    {
      type: 'text',
      name: LaborContractEmployerInfoProperty.WAGE_RATE,
      title:
        LaborContractEmployerInfoNameMap[
          LaborContractEmployerInfoProperty.WAGE_RATE
        ].ko,
      placeholder: '0',
      description:
        "단시간근로자와 사용자 사이에 근로하기로 정한 시간을 초과하여 근로하면 법정근로시간 내라도 통상임금의 100분의 50% 이상의 가산임금 지급('14.9.19 시행)",
      format: 'numbers-only',
      isRequired: true,
      isUnit: true,
      unit: '%',
    },
    {
      type: 'text',
      name: LaborContractEmployerInfoProperty.PAYMENT_DAY,
      title:
        LaborContractEmployerInfoNameMap[
          LaborContractEmployerInfoProperty.PAYMENT_DAY
        ].ko,
      placeholder: '0',
      format: 'numbers-only',
      isRequired: true,
      isPrefix: true,
      prefix: '매월',
      isUnit: true,
      unit: '일',
    },
    {
      type: 'radio',
      name: LaborContractEmployerInfoProperty.PAYMENT_METHOD,
      title:
        LaborContractEmployerInfoNameMap[
          LaborContractEmployerInfoProperty.PAYMENT_METHOD
        ].ko,
      placeholder: '',
      options: ['근로자에게 직접지급', '근로자 명의 예금통장에 입금'],
      isRequired: true,
      transformer: transformers.paymentMethod,
    },
    {
      type: 'checkbox',
      name: LaborContractEmployerInfoProperty.INSURANCE,
      title:
        LaborContractEmployerInfoNameMap[
          LaborContractEmployerInfoProperty.INSURANCE
        ].ko,
      placeholder: '가입할 보험을 선택하세요',
      checkboxOptions: Object.values(InsuranceInfo).map((info) => ({
        key: info.key,
        name: info.name,
      })),
      isRequired: true,
      variant: 'checkbox',
    },
    {
      type: 'signature',
      name: LaborContractEmployerInfoProperty.SIGNATURE_BASE64,
      title:
        LaborContractEmployerInfoNameMap[
          LaborContractEmployerInfoProperty.SIGNATURE_BASE64
        ].ko,
      placeholder: '서명',
      isRequired: true,
    },
  ];

// 표준근로계약서 유학생(직원) 필수 검증 필드 목록
export const EMPLOYEE_REQUIRED_FIELDS: Array<keyof LaborContractEmployeeInfo> =
  ['first_name', 'last_name', 'phone', 'address', 'signature_base64'];

// 시간제 근로 허가서 고용주 폼 필드 타입 정의
export type PartTimePermitEmployerFormField = {
  type: 'text' | 'phone' | 'address' | 'signature' | 'dropdown' | 'number';
  name: keyof EmployerInformation | 'phone';
  title: string;
  placeholder: string;
  description?: string;
  options?: string[];
  format?: string;
  isRequired?: boolean;
  isUnit?: boolean;
  unit?: string;
  isPrefix?: boolean;
  prefix?: string;
  label?: string;
};

// 고용주 시간제 근로 허가서 필수 검증 필드 목록
export const EMPLOYER_PART_TIME_PERMIT_REQUIRED_FIELDS: Array<
  keyof EmployerInformation
> = [
  'company_name',
  'company_registration_number',
  'job_type',
  'name',
  'phone',
  'signature_base64',
  'work_period',
  'hourly_rate',
  'work_days_weekdays',
  'work_days_weekends',
  'address',
];

// 시간제 근로 허가서 고용주 폼 필드 정의
export const PartTimePermitEmployerFormFields: PartTimePermitEmployerFormField[] =
  [
    {
      type: 'text',
      name: 'company_name',
      title:
        PartTimeEmployPermitEmployerInfo[EmployerInfoProperty.COMPANY_NAME].ko,
      placeholder: '이름을 작성해주세요',
      isRequired: true,
    },
    {
      type: 'text',
      name: 'company_registration_number',
      title:
        PartTimeEmployPermitEmployerInfo[
          EmployerInfoProperty.COMPANY_REGISTRATION_NUMBER
        ].ko,
      placeholder: '사업자등록번호를 입력해주세요',
      format: 'business-id',
      isRequired: true,
    },
    {
      type: 'text',
      name: 'job_type',
      title: PartTimeEmployPermitEmployerInfo[EmployerInfoProperty.JOB_TYPE].ko,
      placeholder: '업종을 입력해주세요',
      isRequired: true,
    },
    {
      type: 'address',
      name: 'address',
      title: PartTimeEmployPermitEmployerInfo[EmployerInfoProperty.ADDRESS].ko,
      placeholder: '주소 검색',
      isRequired: true,
      label: '상세 주소',
    },
    {
      type: 'text',
      name: 'name',
      title: PartTimeEmployPermitEmployerInfo[EmployerInfoProperty.NAME].ko,
      placeholder: '이름을 작성해주세요',
      isRequired: true,
    },
    {
      type: 'phone',
      name: 'phone',
      title:
        PartTimeEmployPermitEmployerInfo[EmployerInfoProperty.PHONE_NUMBER].ko,
      placeholder: '',
      isRequired: true,
    },
    {
      type: 'dropdown',
      name: 'work_period',
      title:
        PartTimeEmployPermitEmployerInfo[EmployerInfoProperty.WORK_PERIOD].ko,
      placeholder: '근무 기간을 선택해주세요',
      options: WorkPeriodNames,
      isRequired: true,
    },
    {
      type: 'text',
      name: 'hourly_rate',
      title:
        PartTimeEmployPermitEmployerInfo[EmployerInfoProperty.HOURLY_RATE].ko,
      placeholder: '시급을 입력해주세요',
      description: '2025년 기준 최저시급은 10,030원입니다.',
      format: 'numbers-only',
      isRequired: true,
      isUnit: true,
      unit: '원',
    },
    {
      type: 'text',
      name: 'work_days_weekdays',
      title:
        PartTimeEmployPermitEmployerInfo[
          EmployerInfoProperty.WORK_DAYS_WEEKDAYS
        ].ko,
      placeholder: 'ex) 요일/00:00-00:00 혹은 휴무',
      isRequired: true,
    },
    {
      type: 'text',
      name: 'work_days_weekends',
      title:
        PartTimeEmployPermitEmployerInfo[
          EmployerInfoProperty.WORK_DAYS_WEEKENDS
        ].ko,
      placeholder: 'ex) 요일/00:00-00:00 혹은 휴무',
      isRequired: true,
    },
    {
      type: 'signature',
      name: 'signature_base64',
      title:
        PartTimeEmployPermitEmployerInfo[EmployerInfoProperty.SIGNATURE_BASE64]
          .ko,
      placeholder: '서명',
      isRequired: true,
    },
  ];
