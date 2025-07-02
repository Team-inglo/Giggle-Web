import RadioGroup, {
  RadioGroupVariant,
} from '@/components/Document/write/input/RadioGroup';
import {
  EmployerInfoProperty,
  EmployerInformation,
  IntegratedApplicationData,
  IntegratedApplicationField,
  LaborContractEmployeeInfo,
  LaborContractEmployerInfo,
  LaborContractEmployerInfoProperty,
  PartTimePermitFormRequest,
  ValueTransformer,
} from '@/types/api/document';
import { InputType } from '@/types/common/input';
import {
  EducationLevelInfo,
  GenderList,
  JobCategoryInfo,
  WorkTypeInfo,
} from '@/constants/post';
import { transformers } from '@/utils/transformers';
import {
  DAYS,
  InsuranceInfo,
  IntegratedApplicationPropertyInfo,
  LaborContractEmployeeFormInfo,
  LaborContractEmployeeInfoProperty,
  LaborContractEmployerInfoNameMap,
  PartTimeEmployPermitEmployerInfo,
  PartTimePermitFormInfo,
  PartTimePermitFormProperty,
  WorkPeriodInfo,
} from '@/constants/documents';
import { Nationalities } from '@/constants/manageResume';
import { MINIMUM_WAGE } from '@/constants/wage';
import { isEmailValid } from '@/utils/document';
import { isTodayOrFuture } from '@/utils/post';

export type SelectOption = {
  name: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
};

// 공고 폼 필드 타입 정의 - Discriminated Union으로 개선
// 공통 속성을 가진 기본 타입
type BaseFormField = {
  name: string; // body.title, body.job_category 등의 경로
  title: string;
  placeholder: string;
  description?: string;
  isRequired?: boolean;
  isOptional?: boolean;
};

// 텍스트 입력 필드
type TextFormField = BaseFormField & {
  type: 'text';
  inputType?: InputType;
  isUnit?: boolean;
  unit?: string;
  isPrefix?: boolean;
  prefix?: string;
  format?: string;
  isValid?: (value: string) => boolean;
  errorMessage?: string;
};

// 드롭다운 필드
type DropdownFormField = BaseFormField & {
  type: 'dropdown';
  options: string[] | Record<string, { name: string; [key: string]: unknown }>;
  useKeyValue?: boolean;
  keyValueOptions?: { key: string; name: string }[];
  dropdownValuesList?: string[];
};

// 라디오 버튼 필드
type RadioFormField = BaseFormField & {
  type: 'radio';
  options?: string[] | Record<string, { name: string; [key: string]: unknown }>;
  optionsWithIcon?: SelectOption[];
  selectType?: string;
  transformer?: ValueTransformer;
  variant?: 'checkbox' | 'button';
};

// 근무 시간 필드
type WorkDayTimeFormField = BaseFormField & {
  type: 'work_day_time';
};

// 숫자 입력 필드
type NumberFormField = BaseFormField & {
  type: 'number';
  inputType?: InputType;
  isUnit?: boolean;
  unit?: string;
  format?: string;
};

// 전화번호 입력 필드
type PhoneFormField = BaseFormField & {
  type: 'phone';
};

// 주소 입력 필드
type AddressFormField = BaseFormField & {
  type: 'address';
  label?: string;
};

// 체크박스와 함께 값 입력 필드
type ValueWithCheckboxFormField = BaseFormField & {
  type: 'value_with_checkbox';
  inputType?: InputType;
  isUnit?: boolean;
  unit?: string;
  format?: string;
  isDate?: boolean;
  checkboxLabel?: string;
  isValid?: (value: string) => boolean;
  errorMessage?: string;
};

// 비자 드롭다운 필드
type VisaDropdownFormField = BaseFormField & {
  type: 'visa_dropdown';
};

// 이미지 업로드 필드
type ImageUploadFormField = BaseFormField & {
  type: 'image_upload';
  isEdit?: boolean;
  isImage?: boolean;
};

// 텍스트 영역 필드
type TextareaFormField = BaseFormField & {
  type: 'textarea';
  textareaHeight?: string;
  maxLength?: number;
};

// PostFormField를 discriminated union으로 정의
export type PostFormField =
  | TextFormField
  | DropdownFormField
  | RadioFormField
  | WorkDayTimeFormField
  | NumberFormField
  | PhoneFormField
  | AddressFormField
  | ValueWithCheckboxFormField
  | VisaDropdownFormField
  | ImageUploadFormField
  | TextareaFormField;

export const PostFormFields: Record<string, PostFormField[]> = {
  step1: [
    {
      type: 'radio',
      name: 'body.employment_type',
      title: '타입',
      selectType: RadioGroup.Type.CARDSELECT,
      placeholder: '',
      optionsWithIcon: Object.values(WorkTypeInfo).map(({ name, icon }) => ({
        name,
        icon,
      })),
      isRequired: true,
      transformer: transformers.employmentType,
    },
    {
      type: 'dropdown',
      name: 'body.job_category',
      title: '업직종',
      placeholder: '업직종을 선택해주세요',
      useKeyValue: true,
      options: JobCategoryInfo,
      isRequired: true,
    },
    {
      type: 'text',
      name: 'body.title',
      title: '공고제목',
      placeholder: '제목을 입력해주세요',
      inputType: InputType.TEXT,
      isRequired: true,
      isValid: (value: string) => value.length <= 100,
      errorMessage: '제목은 100자 이하로 입력해주세요',
    },
    {
      type: 'value_with_checkbox',
      name: 'body.recruitment_dead_line',
      title: '공고마감일',
      placeholder: '공고마감일(ex. 2025-07-01)을 입력해주세요',
      inputType: InputType.TEXT,
      isRequired: true,
      format: 'date',
      isDate: true,
      checkboxLabel: '상시모집',
      isValid: (value: string) => isTodayOrFuture(value),
      errorMessage:
        '오늘 이후의 날짜를 형식에 맞게 입력해 주세요 (ex.2026-07-01)',
    },
  ],
  step2: [
    {
      type: 'text',
      name: 'body.hourly_rate',
      title: '시급',
      placeholder: '0',
      inputType: InputType.TEXT,
      isRequired: true,
      isUnit: true,
      unit: '원',
      description: `2025년 기준 최저시급은 ${MINIMUM_WAGE[2025]}원입니다.`,
      isValid: (value: string) =>
        Number(value) >= MINIMUM_WAGE[2025] && Number(value) <= 1000000,
      errorMessage: `2025년 기준 최저시급은 ${MINIMUM_WAGE[2025]}원입니다.`,
    },
    {
      type: 'dropdown',
      name: 'body.work_period',
      title: '근무기간',
      placeholder: '근무기간을 선택해주세요',
      useKeyValue: true,
      options: WorkPeriodInfo,
      isRequired: true,
    },
    {
      type: 'work_day_time',
      name: 'body.work_day_times',
      title: '근무시간',
      placeholder: '원하는 근무 시간을 추가해주세요.',
      isRequired: true,
    },
    {
      type: 'address',
      name: 'body.address',
      title: '근무지주소',
      placeholder: '주소를 검색해주세요',
      isRequired: true,
      label: '상세 주소',
    },
  ],
  step3: [
    {
      type: 'text',
      name: 'body.recruitment_number',
      title: '모집인원',
      placeholder: '0',
      inputType: InputType.TEXT,
      isRequired: true,
      isUnit: true,
      unit: '명',
      format: 'number',
    },
    {
      type: 'radio',
      name: 'body.gender',
      title: '성별',
      selectType: RadioGroup.Type.CHIP,
      placeholder: '',
      options: GenderList,
      isRequired: true,
      transformer: transformers.gender,
    },
    {
      type: 'value_with_checkbox',
      name: 'body.age_restriction',
      title: '연령제한',
      placeholder: '0',
      inputType: InputType.TEXT,
      isRequired: true,
      isUnit: true,
      unit: '살 이상',
      checkboxLabel: '무관',
    },
    {
      type: 'visa_dropdown',
      name: 'body.visa',
      title: '비자',
      placeholder: '비자를 선택해 주세요',
      isRequired: true,
    },
    {
      type: 'dropdown',
      name: 'body.education_level',
      title: '학력',
      placeholder: '학력을 선택해주세요',
      useKeyValue: true,
      options: EducationLevelInfo,
      isRequired: true,
    },
  ],
  step4: [
    {
      name: 'body.recruiter_name',
      type: 'text',
      title: '담당자이름',
      placeholder: '채용 담당자 이름을 입력해주세요',
      isValid: (value: string) => value.length <= 10,
      errorMessage: '담당자 이름은 10자 이하로 입력해주세요',
    },
    {
      name: 'body.recruiter_email',
      type: 'text',
      title: '담당자이메일',
      placeholder: '채용 담당자 이메일을 입력해주세요',
      isValid: isEmailValid,
      errorMessage: '이메일 형식이 올바르지 않습니다',
    },
    {
      name: 'body.recruiter_phone',
      type: 'phone',
      title: '담당자연락처',
      placeholder: '채용 담당자 전화번호를 입력해주세요',
    },
  ],
  step5: [
    {
      name: 'images',
      type: 'image_upload',
      title: '근무 회사 사진',
      placeholder: '사진이 있으면 관심 확률이 올라가요 !',
      isEdit: false,
      isImage: true,
    },
    {
      name: 'body.description',
      type: 'textarea',
      title: '공고 상세 내용',
      placeholder: '상세 내용을 입력해주세요',
      textareaHeight: 'h-[20vh]',
      maxLength: 1000,
    },
    {
      name: 'body.preferred_conditions',
      type: 'text',
      title: '우대 조건',
      placeholder: '우대 조건을 입력해주세요',
      isOptional: true,
      isValid: (value: string) => value.length <= 50,
      errorMessage: '우대 조건은 50자 이하로 입력해주세요',
    },
  ],
};

// Step별 필수 필드 정의
export const POST_REQUIRED_FIELDS = {
  step1: [
    'body.employment_type',
    'body.job_category',
    'body.recruitment_dead_line',
    'body.title',
  ],
  step2: [
    'body.hourly_rate',
    'body.work_period',
    'body.work_day_times',
    'body.address.address_name',
    'body.address.address_detail',
    'body.address.latitude',
    'body.address.longitude',
  ],
  step3: [
    'body.recruitment_number',
    'body.gender',
    'body.age_restriction',
    'body.visa',
    'body.education_level',
  ],
  step4: [
    'body.recruiter_name',
    'body.recruiter_email',
    'body.recruiter_phone',
  ],
  step5: ['images', 'body.description'],
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
  options?: string[] | Record<string, { name: string; [key: string]: unknown }>;
  optionsWithIcon?: SelectOption[];
  format?: string;
  description?: string;
  isUnit?: boolean;
  unit?: string;
  isPrefix?: boolean;
  prefix?: string;
  label?: string;
  selectType?: RadioGroupVariant;
  useKeyValue?: boolean;
  keyValueOptions?: { key: string; name: string }[];
  isValid?: (value: string) => boolean;
  errorMessage?: string;
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
  options?: string[] | Record<string, { name: string; [key: string]: unknown }>;
  optionsWithIcon?: SelectOption[];
  format?: string;
  transformer?: ValueTransformer;
  isRequired?: boolean;
  isUnit?: boolean;
  unit?: string;
  isPrefix?: boolean;
  prefix?: string;
  label?: string;
  selectType?: RadioGroupVariant;
  useKeyValue?: boolean;
  keyValueOptions?: { key: string; name: string }[];
  isValid?: (value: string) => boolean;
  errorMessage?: string;
};

// 통합신청서 폼 필드 정의
export const IntegratedApplicationFormFields: IntegratedApplicationFormField[] =
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
      selectType: RadioGroup.Type.CHIP,
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
      options: Nationalities.map((nationality) => nationality.en),
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
      selectType: RadioGroup.Type.CARDSELECT,
      title:
        IntegratedApplicationPropertyInfo[
          IntegratedApplicationField.IS_ACCREDITED
        ].name,
      placeholder: 'Type Of Name',
      options: [
        'Accredited by Education Office',
        'Non-accredited, Alternative School',
      ],
      optionsWithIcon: [
        {
          name: 'Accredited by Education Office',
        },
        {
          name: 'Non-accredited, Alternative School',
        },
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

// 시간제 근로 허가서 폼 필드 타입 정의
export type PartTimePermitFormField = {
  type: 'text' | 'phone' | 'dropdown';
  name: keyof PartTimePermitFormRequest | 'phone';
  title: string;
  placeholder: string;
  options?: string[] | Record<string, { name: string; [key: string]: unknown }>;
  optionsWithIcon?: SelectOption[];
  format?: string;
  description?: string;
  isUnit?: boolean;
  unit?: string;
  isPrefix?: boolean;
  prefix?: string;
  label?: string;
  selectType?: RadioGroupVariant;
  useKeyValue?: boolean;
  keyValueOptions?: { key: string; name: string }[];
  isValid?: (value: string) => boolean;
  errorMessage?: string;
};

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
  options?: string[] | Record<string, { name: string; [key: string]: unknown }>;
  optionsWithIcon?: SelectOption[];
  checkboxOptions?: CheckboxOption[];
  format?: string;
  transformer?: ValueTransformer;
  isRequired?: boolean;
  prefix?: string;
  isPrefix?: boolean;
  unit?: string;
  isUnit?: boolean;
  selectType?: RadioGroupVariant;
  variant?: 'checkbox' | 'button';
  label?: string;
  textareaHeight?: string;
  maxLength?: number;
  useKeyValue?: boolean;
  keyValueOptions?: { key: string; name: string }[];
  isValid?: (value: string) => boolean;
  errorMessage?: string;
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
      textareaHeight: 'h-[10vh]',
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
      description: `2025년 최소 시급은 ${MINIMUM_WAGE[2025]}원입니다.`,
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
      selectType: RadioGroup.Type.CHIP,
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
      selectType: RadioGroup.Type.CHIP,
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
      selectType: RadioGroup.Type.CHIP,
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
  options?: string[] | Record<string, { name: string; [key: string]: unknown }>;
  optionsWithIcon?: SelectOption[];
  format?: string;
  isRequired?: boolean;
  isUnit?: boolean;
  unit?: string;
  isPrefix?: boolean;
  prefix?: string;
  label?: string;
  useKeyValue?: boolean;
  keyValueOptions?: { key: string; name: string }[];
  isValid?: (value: string) => boolean;
  errorMessage?: string;
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
      useKeyValue: true,
      options: WorkPeriodInfo,
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
