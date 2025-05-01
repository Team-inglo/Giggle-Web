import { PaymentMethod, WorkPeriod } from '@/types/api/document';
import { Gender } from '@/types/api/users';
import {
  EducationLevel,
  EmploymentType,
  JobCategory,
} from '@/types/postCreate/postCreate';

// 라디오버튼 그룹 공통 케이스를 위한 헬퍼 함수들
export const transformers = {
  // 성별 변환기 (한글/영어 모두 지원)
  gender: {
    transformValue: (option: string) => {
      switch (option) {
        case '남':
        case 'Male':
          return Gender.MALE;
        case '여':
        case 'Female':
          return Gender.FEMALE;
        case '무관':
        case 'None':
          return Gender.NONE;
        default:
          return Gender.NONE;
      }
    },
    compareValue: (value: Gender, option: string) => {
      switch (option) {
        case '남':
        case 'Male':
          return value === Gender.MALE;
        case '여':
        case 'Female':
          return value === Gender.FEMALE;
        case '무관':
        case 'None':
          return value === Gender.NONE;
        default:
          return false;
      }
    },
  },

  // Boolean 값으로 저장하는 변환기
  boolean: (trueOption: string) => ({
    transformValue: (option: string) => option === trueOption,
    compareValue: (value: boolean, option: string) =>
      (value === true && option === trueOption) ||
      (value === false && option !== trueOption),
  }),

  // "있어요"/"없어요" 라디오 버튼을 위한 변환기
  presence: {
    transformValue: (option: string) => (option === '있어요' ? 0 : null),
    compareValue: (value: number | null, option: string) =>
      (value !== null && option === '있어요') ||
      (value === null && option === '없어요'),
  },

  // PaymentMethod enum을 처리하기 위한 변환기
  paymentMethod: {
    transformValue: (option: string) => {
      switch (option) {
        case '근로자에게 직접지급':
          return PaymentMethod.DIRECT;
        case '근로자 명의 예금통장에 입금':
          return PaymentMethod.BANK_TRANSFER;
        default:
          return PaymentMethod.DIRECT;
      }
    },
    compareValue: (value: PaymentMethod, option: string) => {
      switch (option) {
        case '근로자에게 직접지급':
          return value === PaymentMethod.DIRECT;
        case '근로자 명의 예금통장에 입금':
          return value === PaymentMethod.BANK_TRANSFER;
        default:
          return false;
      }
    },
  },

  employmentType: {
    transformValue: (option: string) => {
      switch (option) {
        case '아르바이트':
          return EmploymentType.PARTTIME;
        case '인턴십':
          return EmploymentType.INTERNSHIP;
        default:
          return EmploymentType.PARTTIME;
      }
    },
    compareValue: (value: EmploymentType, option: string) => {
      switch (option) {
        case '아르바이트':
          return value === EmploymentType.PARTTIME;
        case '인턴십':
          return value === EmploymentType.INTERNSHIP;
        default:
          return false;
      }
    },
  },

  // 업직종 변환기
  jobCategory: {
    transformValue: (option: string) => {
      switch (option) {
        case '일반통역/번역':
          return JobCategory.GENERAL_INTERPRETATION_TRANSLATION;
        case '음식업보조':
          return JobCategory.FOOD_SERVICE_ASSISTANT;
        case '일반 사무보조':
          return JobCategory.GENERAL_ADMINISTRATIVE_SUPPORT;
        case '영어키즈카페':
          return JobCategory.ENGLISH_KIDS_CAFE;
        case '일반카페':
          return JobCategory.GENERAL_CAFE;
        case '놀이보조':
          return JobCategory.PART_TIME_WORK;
        case '관광안내보조 및 면세점판매보조':
          return JobCategory.TOUR_GUIDE_AND_DUTY_FREE_ASSISTANT;
        case '제조업':
          return JobCategory.MANUFACTURING;
        default:
          return JobCategory.GENERAL_INTERPRETATION_TRANSLATION;
      }
    },
    compareValue: (value: JobCategory, option: string) => {
      switch (option) {
        case '일반통역/번역':
          return value === JobCategory.GENERAL_INTERPRETATION_TRANSLATION;
        case '음식업보조':
          return value === JobCategory.FOOD_SERVICE_ASSISTANT;
        case '일반 사무보조':
          return value === JobCategory.GENERAL_ADMINISTRATIVE_SUPPORT;
        case '영어키즈카페':
          return value === JobCategory.ENGLISH_KIDS_CAFE;
        case '일반카페':
          return value === JobCategory.GENERAL_CAFE;
        case '놀이보조':
          return value === JobCategory.PART_TIME_WORK;
        case '관광안내보조 및 면세점판매보조':
          return value === JobCategory.TOUR_GUIDE_AND_DUTY_FREE_ASSISTANT;
        case '제조업':
          return value === JobCategory.MANUFACTURING;
        default:
          return false;
      }
    },
  },

  // 근무기간 변환기
  workPeriod: {
    transformValue: (option: string) => {
      switch (option) {
        case '하루':
          return WorkPeriod.ONE_DAY;
        case '1주 미만':
          return WorkPeriod.LESS_THAN_ONE_WEEK;
        case '1주 ~ 1개월':
          return WorkPeriod.ONE_WEEK_TO_ONE_MONTH;
        case '1개월 ~ 3개월':
          return WorkPeriod.ONE_MONTH_TO_THREE_MONTHS;
        case '3개월 ~ 6개월':
          return WorkPeriod.THREE_MONTHS_TO_SIX_MONTHS;
        case '6개월 ~ 1년':
          return WorkPeriod.SIX_MONTHS_TO_ONE_YEAR;
        case '1년 이상':
          return WorkPeriod.MORE_THAN_ONE_YEAR;
        default:
          return WorkPeriod.ONE_DAY;
      }
    },
    compareValue: (value: WorkPeriod, option: string) => {
      switch (option) {
        case '하루':
          return value === WorkPeriod.ONE_DAY;
        case '1주 미만':
          return value === WorkPeriod.LESS_THAN_ONE_WEEK;
        case '1주 ~ 1개월':
          return value === WorkPeriod.ONE_WEEK_TO_ONE_MONTH;
        case '1개월 ~ 3개월':
          return value === WorkPeriod.ONE_MONTH_TO_THREE_MONTHS;
        case '3개월 ~ 6개월':
          return value === WorkPeriod.THREE_MONTHS_TO_SIX_MONTHS;
        case '6개월 ~ 1년':
          return value === WorkPeriod.SIX_MONTHS_TO_ONE_YEAR;
        case '1년 이상':
          return value === WorkPeriod.MORE_THAN_ONE_YEAR;
        default:
          return false;
      }
    },
  },

  // 학력 변환기
  educationLevel: {
    transformValue: (option: string) => {
      switch (option) {
        case '대학(4년제)':
          return EducationLevel.BACHELOR;
        case '대학(2년제)':
          return EducationLevel.ASSOCIATE;
        case '고등학교졸업':
          return EducationLevel.HIGHSCHOOL;
        case '무관':
          return EducationLevel.NONE;
        default:
          return EducationLevel.NONE;
      }
    },
    compareValue: (value: EducationLevel, option: string) => {
      switch (option) {
        case '대학(4년제)':
          return value === EducationLevel.BACHELOR;
        case '대학(2년제)':
          return value === EducationLevel.ASSOCIATE;
        case '고등학교졸업':
          return value === EducationLevel.HIGHSCHOOL;
        case '무관':
          return value === EducationLevel.NONE;
        default:
          return false;
      }
    },
  },
};
