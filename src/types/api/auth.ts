import { Address, Language, UserInfo } from './users';

export type SignInRequest = {
  serial_id: string;
  password: string;
};

export type SignInResponse = {
  access_token: string;
  refresh_token: string;
};

export type SignUpRequest = {
  temporary_token: string;
  user_info: UserInfo;
  address: Address;
  marketing_allowed: boolean;
  notification_allowed: boolean;
  language: Language;
};

export type SignUpResponse = {
  access_token: string;
  refresh_token: string;
};
