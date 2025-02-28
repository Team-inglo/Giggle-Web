import { EmployerProfileRequestBody } from '@/types/api/profile';

const isValidString = (value: string): boolean => {
  return typeof value === 'string' && value.trim() !== '';
};

export const isValidEmployerProfile = (
  data: EmployerProfileRequestBody,
): boolean => {
  const nameRegex = /^[a-zA-Z가-힣\s]+$/;
  const companyRegistrationNumPattern = /^\d{3}\/\d{2}\/\d{5}$/;
  const phonePattern = /.*-\d{4}-\d{4}$/;
  // owner_info의 모든 필드 체크
  const { owner_info } = data;
  if (
    !isValidString(owner_info.company_name) ||
    !isValidString(owner_info.owner_name) ||
    !nameRegex.test(owner_info.owner_name) ||
    !isValidString(owner_info.company_registration_number) ||
    !companyRegistrationNumPattern.test(
      owner_info.company_registration_number,
    ) ||
    !phonePattern.test(owner_info.phone_number)
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
    !isValidString(address.address_detail)
  ) {;
    return false;
  }

  // region_4depth_name은 optional이므로 값이 있는 경우에만 검증
  if (
    address.region_4depth_name &&
    !isValidString(address.region_4depth_name ?? '')
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
