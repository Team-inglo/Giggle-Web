// Enum types
export const enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NONE = 'NONE',
}

export const enum Language {
  KOREAN = 'KOREAN',
  VIETNAMESE = 'VIETNAMESE',
  UZBEK = 'UZBEK',
  TURKISH = 'TURKISH',
  ENGLISH = 'ENGLISH',
}

export const enum TermType {
  PERSONAL_SERVICE_TERMS = 'personal-service-terms',
  ENTERPRISE_SERVICE_TERMS = 'enterprise-service-terms',
  LOCATION_BASED_TERMS = 'location-based-terms',
  PRIVACY_POLICY = 'privacy-policy',
}

// Type for user info with nullable fields
export type UserInfo = {
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  birth: string | null; // Format: yyyy/mm/dd
  nationality: string | null;
  visa: string | null;
  phone_number: string | null;
};

// Type for address with nullable fields
export type GiggleAddress = {
  address_name: string | null;
  region_1depth_name: string | null;
  region_2depth_name: string | null;
  region_3depth_name: string | null;
  region_4depth_name: string | null;
  address_detail: string | null;
  longitude: number | null;
  latitude: number | null;
};

// Main type for the API request body with nullable fields
export type UserInfoRequestBody = {
  temporary_token: string | null;
  user_info: UserInfo;
  address: GiggleAddress;
  language: Language | null;
};

// Initial state for UserInfo
export const initialUserInfo: UserInfo = {
  first_name: '',
  last_name: '',
  gender: 'MALE',
  birth: '',
  nationality: '',
  visa: '',
  phone_number: '',
};

// Initial state for Address
export const initialAddress: GiggleAddress = {
  address_name: '',
  region_1depth_name: '',
  region_2depth_name: '',
  region_3depth_name: '',
  region_4depth_name: '',
  address_detail: '',
  longitude: null,
  latitude: null,
};

// Initial state for UserInfoRequestBody
export const initialUserInfoRequestBody: UserInfoRequestBody = {
  temporary_token: null,
  user_info: initialUserInfo,
  address: initialAddress,
  language: null,
};
