import { Language } from '@/components/Common/HelperLabel';
import { UserType } from '@/constants/user';
import { EmployerRegistrationRequestBody } from '@/types/api/employ';

const isValidString = (value: string): boolean => {
  return typeof value === 'string' && value.trim() !== '';
};

export const isValidEmployerRegistration = (
  data: EmployerRegistrationRequestBody,
): boolean => {
  const phonePattern = /.*-\d{4}-\d{4}$/;
  const companyRegisterNumPattern = /^\d{3}\/\d{2}\/\d{5}$/;
  // owner_info의 모든 필드 체크
  const { owner_info } = data;
  if (
    !isValidString(owner_info.company_name) ||
    !isValidString(owner_info.owner_name) ||
    !isValidString(owner_info.company_registration_number) ||
    !phonePattern.test(owner_info.phone_number) ||
    !companyRegisterNumPattern.test(owner_info.company_registration_number)
  ) {
    return false;
  }

  // address의 필수 필드 체크
  const { address } = data;
  if (
    !address.address_name ||
    !isValidString(address.address_name) ||
    !address.region_1depth_name ||
    !isValidString(address.region_1depth_name) ||
    !address.region_2depth_name ||
    !isValidString(address.region_2depth_name) ||
    !address.region_3depth_name ||
    !isValidString(address.region_3depth_name) ||
    !address.address_detail ||
    !isValidString(address.address_detail) ||
    !(address.address_detail.length <= 50)
  ) {
    return false;
  }

  // region_4depth_name은 optional이므로 값이 있는 경우에만 검증
  if (
    address.region_4depth_name !== null &&
    !isValidString(address.region_4depth_name)
  ) {
    return false;
  }

  // 숫자 필드 체크
  if (
    typeof address.longitude !== 'number' ||
    typeof address.latitude !== 'number'
  ) {
    return false;
  }

  return true;
};

// 고용주일 때 한국어, 유학생일 때 영어를 보여주기 위함
export const isEmployer = (pathname: string): Language => {
  if (pathname.includes('/employer')) {
    return Language.KO;
  }
  return Language.EN;
};

// account_type을 통해 고용주라면 한국어, 아니라면 영어를 보여주기 위함
export const isEmployerByAccountType = (accountType: UserType | undefined) => {
  if (accountType === UserType.OWNER) return 'ko';
  return 'en';
};
