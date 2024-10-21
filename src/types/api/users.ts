// Enum types
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NONE = 'NONE',
}

export enum Nationality {
  SOUTH_KOREA = 'SOUTH_KOREA',
  JAPAN = 'JAPAN',
  CHINA = 'CHINA',
  VIETNAME = 'VIETNAME',
  UZBEKISTAN = 'UZBEKISTAN',
}

export enum Visa {
  'D-2-1' = 'D-2-1',
  'D-2-2' = 'D-2-2',
  'D-2-3' = 'D-2-3',
  'D-2-4' = 'D-2-4',
  'D-2-6' = 'D-2-6',
  'D-2-7' = 'D-2-7',
  'D-2-8' = 'D-2-8',
  'D-4-1' = 'D-4-1',
  'D-4-7' = 'D-4-7',
  'F-2' = 'F-2',
}

export enum Language {
  KOREAN = 'KOREAN',
  VIETNAMESE = 'VIETNAMESE',
  UZBEK = 'UZBEK',
  TURKISH = 'TURKISH',
  ENGLISH = 'ENGLISH',
}

// Type for user info with undefinedable fields
export type UserInfo = {
  id: string | undefined;
  email: string | undefined;
  marketing_allow: boolean | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
  gender: string | undefined;
  birth: string | undefined; // Format: yyyy/mm/dd
  nationality: string | undefined;
  visa: string | undefined;
  phone_number: string | undefined;
}

// Type for address with undefinedable fields
export type Address = {
  address_name: string | undefined;
  region_1depth_name: string | undefined;
  region_2depth_name: string | undefined;
  region_3depth_name: string | undefined;
  region_4depth_name: string | undefined;
  address_detail: string | undefined;
  longitude: number | undefined;
  latitude: number | undefined;
}

// Main type for the API request body with undefinedable fields
export type UserInfoRequestBody = {
  temporary_token: string | undefined;
  user_info: UserInfo;
  address: Address;
  language: Language | undefined;
}

// Initial state for UserInfo
export const initialUserInfo: UserInfo = {
  id: undefined,
  email: undefined,
  marketing_allow: undefined,
  first_name: "",
  last_name: "",
  gender: 'MALE',
  birth: "",
  nationality: "",
  visa: "",
  phone_number: "",
}

// Initial state for Address
export const initialAddress: Address = {
  address_name: "",
  region_1depth_name: "",
  region_2depth_name: "",
  region_3depth_name: "",
  region_4depth_name: "",
  address_detail: "",
  longitude: undefined,
  latitude: undefined,
}

// Initial state for UserInfoRequestBody
export const initialUserInfoRequestBody: UserInfoRequestBody = {
  temporary_token: undefined,
  user_info: initialUserInfo,
  address: initialAddress,
  language: undefined,
}