import { GiggleAddress } from '@/types/api/users';

export type OwnerInfo = {
  company_name: string;
  owner_name: string;
  company_registration_number: string;
  phone_number: string;
};

export type EmployerRegistrationRequest = {
  image: File | undefined;
  body: EmployerRegistrationRequestBody;
};

export type EmployerRegistrationRequestBody = {
  temporary_token: string;
  owner_info: OwnerInfo;
  address: GiggleAddress;
  marketing_allowed: boolean;
  notification_allowed: boolean;
};

// Initial State
export const initialEmployerRegistration: EmployerRegistrationRequestBody = {
  temporary_token: '',
  owner_info: {
    company_name: '',
    owner_name: '',
    company_registration_number: '',
    phone_number: '',
  },
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
  marketing_allowed: false,
  notification_allowed: true,
};
