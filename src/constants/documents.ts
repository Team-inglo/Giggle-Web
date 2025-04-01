import {
  PartTimeEmployeeInfoProperty,
  Insurance,
  IntegratedApplicationData,
  LaborContractEmployerInfo,
  LaborContractEmployerInfoProperty,
  PaymentMethod,
  WorkPeriod,
  IntegratedApplicationField,
} from '@/types/api/document';
import {
  DocumentType,
  EmployerInfoProperty,
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
    ko: '보너스',
    key: 'bonus',
  },
  [LaborContractEmployerInfoProperty.ADDITIONAL_SALARY]: {
    name: 'Other benefits (such as allowances)',
    ko: '기타 복지',
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
  phone_number: '010-0000-0000',
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
