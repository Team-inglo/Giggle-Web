import { PaymentMethod } from '@/types/api/document';
import { Gender } from '@/types/api/users';
import { EmploymentType } from '@/types/postCreate/postCreate';

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
};
