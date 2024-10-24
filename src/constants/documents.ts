import { DayOfWeek, Insurance, LaborContractEmployerInfo, LaborContractEmployerInfoProperty, PaymentMethod } from '@/types/api/document';
import {
  DocumentType,
  EmployerInfoProperty,
  EmployerInformation,
  LaborContractEmployeeInfo,
  PartTimePermitFormRequest,
} from '@/types/api/document';

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

// 시간제근무 허가 신청서 초기 state
export const initialPartTimePermitForm: PartTimePermitFormRequest = {
  first_name: '',
  last_name: '',
  major: '',
  term_of_completion: 0,
  phone_number: '000-0000-0000',
  email: '',
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

// 근로계약서 고용주 mock data
export const sampleLaborContract: LaborContractEmployerInfo = {
  company_name: "ABC Technology Co., Ltd.",
  name: "John Smith",
  start_date: "2024-01-01",
  end_date: "2024-12-31",
  address: {
    address_name: "서울특별시 강남구 테헤란로 123",
    region_1depth_name: "서울특별시",
    region_2depth_name: "강남구",
    region_3depth_name: "테헤란로",
    region_4depth_name: undefined,
    address_detail: "ABC빌딩 5층",
    longitude: 127.0495556,
    latitude: 37.5048122
  },
  description: "Software development and maintenance for web applications",
  work_day_time_list: [
    {
      day_of_week: DayOfWeek.MONDAY,
      work_start_time: "09:00",
      work_end_time: "18:00",
      break_start_time: "12:00",
      break_end_time: "13:00"
    },
    {
      day_of_week: DayOfWeek.TUESDAY,
      work_start_time: "09:00",
      work_end_time: "18:00",
      break_start_time: "12:00",
      break_end_time: "13:00"
    },
    {
      day_of_week: DayOfWeek.WEDNESDAY,
      work_start_time: "09:00",
      work_end_time: "18:00",
      break_start_time: "12:00",
      break_end_time: "13:00"
    },
    {
      day_of_week: DayOfWeek.THURSDAY,
      work_start_time: "09:00",
      work_end_time: "18:00",
      break_start_time: "12:00",
      break_end_time: "13:00"
    },
    {
      day_of_week: DayOfWeek.FRIDAY,
      work_start_time: "09:00",
      work_end_time: "18:00",
      break_start_time: "12:00",
      break_end_time: "13:00"
    }
  ],
  weekly_last_days: [DayOfWeek.SATURDAY, DayOfWeek.SUNDAY],
  hourly_rate: 20000,
  bonus: 2000000,
  additional_salary: 500000,
  wage_rate: 1.5,
  payment_day: 10,
  payment_method: PaymentMethod.BANK_TRANSFER,
  insurance: Insurance.HEALTH_INSURANCE,
  signature_base64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
};