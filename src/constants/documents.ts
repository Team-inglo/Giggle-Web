import {
  DayOfWeek,
  PartTimeEmployeeInfoProperty,
  Insurance,
  IntegratedApplicationData,
  LaborContractEmployerInfo,
  LaborContractEmployerInfoProperty,
  PaymentMethod,
  WorkPeriod,
} from '@/types/api/document';
import {
  DocumentType,
  EmployerInfoProperty,
  EmployerInformation,
  LaborContractEmployeeInfo,
  PartTimePermitFormRequest,
} from '@/types/api/document';
import { Gender } from '@/types/api/users';

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
    name: '시간제취업허가서',
    key: 'part_time_employment_permits',
  },
  [DocumentType.LABOR_CONTRACT]: {
    name: '표준근로계약서',
    key: 'standard_labor_contract',
  },
  [DocumentType.INTEGRATED_APPLICATION]: {
    name: 'Integrated Application Form',
    key: 'integrated_application',
  },
} as const;

export const DocumentSubTitleContent = {
  [DocumentType.PART_TIME_PERMIT]: {
    name: 'Part-Time Employment Permit',
    key: 'part_time_employment_permits',
    content:
      "International students must have the applicable permit to work part-time or part-time. If you don't get permission, you can become an illegal resident.",
  },
  [DocumentType.LABOR_CONTRACT]: {
    name: 'Standard labor contract for short-time workers',
    key: 'standard_labor_contract',
    content:
      'Regardless of the type of employment, all workers are required to write an employment contract, which allows them to maintain a legal and transparent employment relationship.',
  },
  [DocumentType.INTEGRATED_APPLICATION]: {
    name: 'Application Form',
    key: 'integrated_application',
    content:
      'The Application Form is a required document that international students must submit to legally work part-time in Korea. This form reports the workplace and working conditions, allowing the student to obtain employment approval.',
  },
} as const;

export const EmployerDocumentSubTitleContent = {
  [DocumentType.PART_TIME_PERMIT]: {
    name: '시간제 취업허가서',
    key: 'part_time_employment_permits',
    content:
      '유학생이 아르바이트나 시간제 근무를 하기 위해서는 반드시 해당 허가서를 소지해야 합니다. 허가를 받지 않은 유학생을 고용할 경우, 고용주에게 불이익이 발생할 수 있습니다.',
  },
  [DocumentType.LABOR_CONTRACT]: {
    name: '단시간근로자 표준근로계약서',
    key: 'standard_labor_contract',
    content:
      '고용 형태와 관계없이 모든 근로자는 근로계약서를 작성해야하며, 이를 통해 합법적이고 투명한 고용 관계를 유지할 수 있습니다.',
  },
  [DocumentType.INTEGRATED_APPLICATION]: {
    name: 'Application Form',
    key: 'integrated_application',
    content:
      'The Application Form is a required document that international students must submit to legally work part-time in Korea. This form reports the workplace and working conditions, allowing the student to obtain employment approval.',
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
    key: 'first_name',
  },
  [PartTimePermitFormProperty.LAST_NAME]: {
    name: 'Last name',
    key: 'last_name',
  },
  [PartTimePermitFormProperty.MAJOR]: {
    name: 'Major',
    key: 'major',
  },
  [PartTimePermitFormProperty.TERM_OF_COMPLETION]: {
    name: 'Term of completion',
    key: 'term_of_completion',
  },
  [PartTimePermitFormProperty.PHONE_NUMBER]: {
    name: 'Phone number',
    key: 'phone_number',
  },
  [PartTimePermitFormProperty.EMAIL]: {
    name: 'Email',
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
  email: '',
};
// 시간제 근무 허가 신청서 mock data
export const mockPartTimePermitForm: PartTimePermitFormRequest = {
  first_name: '길동',
  last_name: '홍',
  major: '컴퓨터공학과',
  term_of_completion: 4,
  phone_number: '010-1234-5678',
  email: 'gildong.hong@example.com',
};

// 시간제 근무 허가서 내 고용주 입력 정보 속성과 이름 mapping
export const PartTimeEmployPermitEmployerInfo = {
  [EmployerInfoProperty.COMPANY_NAME]: {
    name: 'Company name',
    key: 'company_name',
  },
  [EmployerInfoProperty.COMPANY_REGISTRATION_NUMBER]: {
    name: 'Business registration number',
    key: 'company_registration_number',
  },
  [EmployerInfoProperty.JOB_TYPE]: {
    name: 'Industry',
    key: 'job_type',
  },
  [EmployerInfoProperty.NAME]: {
    name: 'Representative',
    key: 'name',
  },
  [EmployerInfoProperty.PHONE_NUMBER]: {
    name: 'Phone number',
    key: 'phone_number',
  },
  [EmployerInfoProperty.SIGNATURE_BASE64]: {
    name: "Representative's signature",
    key: 'signature_base64',
  },
  [EmployerInfoProperty.WORK_PERIOD]: {
    name: 'Work period',
    key: 'work_period',
  },
  [EmployerInfoProperty.HOURLY_RATE]: {
    name: 'Hourly rate',
    key: 'hourly_rate',
  },
  [EmployerInfoProperty.WORK_DAYS_WEEKDAYS]: {
    name: 'Weekday work hours',
    key: 'work_days_weekdays',
  },
  [EmployerInfoProperty.WORK_DAYS_WEEKENDS]: {
    name: 'Weekend work hours',
    key: 'work_days_weekends',
  },
  [EmployerInfoProperty.ADDRESS]: {
    name: 'Address in Korea',
    key: 'address',
  },
} as const;

// 표준 근로계약서 내 고용주 입력 정보 속성과 이름 mapping
export const LaborContractEmployerInfoNameMap = {
  [LaborContractEmployerInfoProperty.COMPANY_NAME]: {
    name: 'Company name',
    key: 'company_name',
  },
  [LaborContractEmployerInfoProperty.COMPANY_REGISTRATION_NUMBER]: {
    name: 'Company Registration Number',
    key: 'company_registration_number',
  },
  [LaborContractEmployerInfoProperty.PHONE_NUMBER]: {
    name: 'Company Phone Number',
    key: 'phone_number',
  },
  [LaborContractEmployerInfoProperty.NAME]: {
    name: 'Representative name',
    key: 'name',
  },
  [LaborContractEmployerInfoProperty.START_DATE]: {
    name: 'Work start date',
    key: 'start_date',
  },
  [LaborContractEmployerInfoProperty.END_DATE]: {
    name: 'Work end date',
    key: 'end_date',
  },
  [LaborContractEmployerInfoProperty.ADDRESS]: {
    name: 'Work place address',
    key: 'address',
  },
  [LaborContractEmployerInfoProperty.DESCRIPTION]: {
    name: 'Work details',
    key: 'description',
  },
  [LaborContractEmployerInfoProperty.WORK_DAY_TIME_LIST]: {
    name: 'Working days and working hours by working days',
    key: 'work_day_time_list',
  },
  [LaborContractEmployerInfoProperty.WEEKLY_LAST_DAYS]: {
    name: 'Weekly holidays',
    key: 'weekly_last_days',
  },
  [LaborContractEmployerInfoProperty.HOURLY_RATE]: {
    name: 'Hourly pay',
    key: 'hourly_rate',
  },
  [LaborContractEmployerInfoProperty.BONUS]: {
    name: 'Bonuses',
    key: 'bonus',
  },
  [LaborContractEmployerInfoProperty.ADDITIONAL_SALARY]: {
    name: 'Other benefits (such as allowances)',
    key: 'additional_salary',
  },
  [LaborContractEmployerInfoProperty.WAGE_RATE]: {
    name: 'Additional wage rate for overtime work',
    key: 'wage_rate',
  },
  [LaborContractEmployerInfoProperty.PAYMENT_DAY]: {
    name: 'Wage payment date',
    key: 'payment_day',
  },
  [LaborContractEmployerInfoProperty.PAYMENT_METHOD]: {
    name: 'Wage payment method',
    key: 'payment_method',
  },
  [LaborContractEmployerInfoProperty.INSURANCE]: {
    name: 'Social insurance coverage',
    key: 'insurance',
  },
  [LaborContractEmployerInfoProperty.SIGNATURE_BASE64]: {
    name: "Representative's signature",
    key: 'signature_base64',
  },
} as const;

// 고용주 mock data
export const mockEmployerInformation: EmployerInformation = {
  company_name: '테크스타트 주식회사',
  company_registration_number: '123-45-67890',
  job_type: '정보통신업',
  name: '홍길동',
  phone_number: '010-1111-1111',
  signature_base64: '',
  work_period: WorkPeriod.ONE_MONTH_TO_THREE_MONTHS,
  hourly_rate: 10000,
  work_days_weekdays: null,
  work_days_weekends: null,
  address: {
    address_name: '서울 강남구 테헤란로 401 팁스타운',
    region_1depth_name: '서울',
    region_2depth_name: '강남구',
    region_3depth_name: '삼성동',
    region_4depth_name: '테헤란로 401',
    address_detail: '팁스타운 6층',
    longitude: 127.0507355,
    latitude: 37.5051374,
  },
};

// 고용주 표준근로계약서 초기 state
export const initialLaborContractEmployerInfo: LaborContractEmployerInfo = {
  company_name: '',
  company_registration_number: null,
  phone_number: '',
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
    key: 'first_name',
  },
  [LaborContractEmployeeInfoProperty.LAST_NAME]: {
    name: 'Last name',
    key: 'last_name',
  },
  [LaborContractEmployeeInfoProperty.PHONE_NUMBER]: {
    name: 'Phone number',
    key: 'phone_number',
  },
  [LaborContractEmployeeInfoProperty.SIGNATURE_BASE64]: {
    name: 'Signature',
    key: 'signature_base64',
  },
  [LaborContractEmployeeInfoProperty.ADDRESS]: {
    name: 'Address',
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
  phone_number: '010-0000-0000',
  signature_base64: '',
};

// 표준계약서 mock data
export const mockLaborContractEmployeeInfo: LaborContractEmployeeInfo = {
  first_name: '영희',
  last_name: '박',
  address: {
    address_name: '경기도 성남시 분당구 판교역로 235',
    region_1depth_name: '경기도',
    region_2depth_name: '성남시',
    region_3depth_name: '분당구 판교역로',
    region_4depth_name: '235',
    address_detail: '에이치스퀘어 N동 8층',
    longitude: 127.1086228,
    latitude: 37.4020909,
  },
  phone_number: '010-9876-5432',
  signature_base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA...',
};

// 근로계약서 고용주 mock data
export const sampleLaborContract: LaborContractEmployerInfo = {
  company_name: 'ABC Technology Co., Ltd.',
  company_registration_number: null,
  phone_number: '010-1111-1111',
  name: 'John Smith',
  start_date: '2024-01-01',
  end_date: '2024-12-31',
  address: {
    address_name: '서울특별시 강남구 테헤란로 123',
    region_1depth_name: '서울특별시',
    region_2depth_name: '강남구',
    region_3depth_name: '테헤란로',
    region_4depth_name: null,
    address_detail: 'ABC빌딩 5층',
    longitude: 127.0495556,
    latitude: 37.5048122,
  },
  description: 'Software development and maintenance for web applications',
  work_day_time_list: [
    {
      day_of_week: DayOfWeek.MONDAY,
      work_start_time: '09:00',
      work_end_time: '18:00',
      break_start_time: '12:00',
      break_end_time: '13:00',
    },
    {
      day_of_week: DayOfWeek.TUESDAY,
      work_start_time: '09:00',
      work_end_time: '18:00',
      break_start_time: '12:00',
      break_end_time: '13:00',
    },
    {
      day_of_week: DayOfWeek.WEDNESDAY,
      work_start_time: '09:00',
      work_end_time: '18:00',
      break_start_time: '12:00',
      break_end_time: '13:00',
    },
    {
      day_of_week: DayOfWeek.THURSDAY,
      work_start_time: '09:00',
      work_end_time: '18:00',
      break_start_time: '12:00',
      break_end_time: '13:00',
    },
    {
      day_of_week: DayOfWeek.FRIDAY,
      work_start_time: '09:00',
      work_end_time: '18:00',
      break_start_time: '12:00',
      break_end_time: '13:00',
    },
  ],
  weekly_last_days: [DayOfWeek.SATURDAY, DayOfWeek.SUNDAY],
  hourly_rate: 20000,
  bonus: 2000000,
  additional_salary: 500000,
  wage_rate: 1.5,
  payment_day: 10,
  payment_method: PaymentMethod.BANK_TRANSFER,
  insurance: [Insurance.HEALTH_INSURANCE],
  signature_base64:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==',
};

// 통합신청서 초기 state
export const initialIntegratedApplication: IntegratedApplicationData = {
  first_name: '',
  last_name: '',
  birth: '',
  gender: Gender.MALE,
  nationality: '',
  tele_phone_number: '',
  cell_phone_number: '',
  is_accredited: true,
  school_name: '',
  school_phone_number: '',
  new_work_place_name: '',
  new_work_place_registration_number: '',
  new_work_place_phone_number: '',
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

// 통합 신청서 mock data
export const mockIntegratedApplication: IntegratedApplicationData = {
  first_name: '길동',
  last_name: '홍',
  birth: '1990-01-01',
  gender: Gender.MALE,
  nationality: '대한민국',
  tele_phone_number: '02-1234-5678',
  cell_phone_number: '010-1234-5678',
  is_accredited: true,
  school_name: '서울대학교',
  school_phone_number: '02-880-5114',
  new_work_place_name: '(주)테크컴퍼니',
  new_work_place_registration_number: '123-45-67890',
  new_work_place_phone_number: '02-3456-7890',
  annual_income_amount: 50000000,
  occupation: '소프트웨어 엔지니어',
  email: 'gildong.hong@example.com',
  signature_base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  address: {
    address_name: '서울특별시 강남구 테헤란로 123',
    region_1depth_name: '서울특별시',
    region_2depth_name: '강남구',
    region_3depth_name: '테헤란로',
    region_4depth_name: '123',
    address_detail: '테크빌딩 15층',
    longitude: 127.0495556,
    latitude: 37.5063889,
  },
};

// 학교 검색 api 연결 전 사용할 학교 mock data
export const schoolMockData = [
  {
    id: 1,
    name: '서울대학교',
    phone_number: '02-880-5114',
  },
  {
    id: 2,
    name: '연세대학교',
    phone_number: '02-2123-2114',
  },
  {
    id: 3,
    name: '고려대학교',
    phone_number: '02-3290-1114',
  },
  {
    id: 4,
    name: '한양대학교',
    phone_number: '02-2220-0114',
  },
  {
    id: 5,
    name: '성균관대학교',
    phone_number: '02-760-1114',
  },
  {
    id: 6,
    name: '경희대학교',
    phone_number: '02-961-0114',
  },
  {
    id: 7,
    name: '중앙대학교',
    phone_number: '02-820-5114',
  },
];

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

// 고용주 시간제 근무 허가서 초기 state
export const initialPartTimePermitEmployerForm = {
  company_name: '',
  company_registration_number: '',
  job_type: '',
  name: '',
  phone_number: '',
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
