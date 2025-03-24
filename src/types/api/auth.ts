import { UserType } from '@/constants/user';
import { GiggleAddress, Language, TermType, UserInfo } from '@/types/api/users';

export type SignInRequest = FormData;

export type SignInResponse = {
  access_token: string;
  refresh_token: string;
};

export type UserTypeResponse = {
  account_type: UserType;
  name: string;
};

export type TempSignUpRequest = {
  password: string;
  email: string;
  account_type: string;
};

export type TempSignUpResponse = {
  tryCnt: number;
};

export type SignUpRequest = {
  temporary_token: string;
  user_info: UserInfo;
  address: GiggleAddress | null;
  marketing_allowed: boolean;
  notification_allowed: boolean;
  language: Language;
  term_types: TermType[];
};
/*
export type OwnerSignUpRequest = {
  temporary_token: String;
  owner_info: OwnerInfoRequest;
  address: Address;
  marketing_allowed: Boolean;
  notification_allowed: Boolean;
};
*/

export type SignUpResponse = {
  access_token: string;
  refresh_token: string;
};

export type ValidationResponse = {
  is_valid: boolean;
};

export type AuthenticationRequest = {
  email: string;
  authentication_code: string;
};

export type AuthenticationResponse = {
  temporary_token: string;
};

export type ReIssueAuthenticationRequest = {
  email: string;
};

export type PolicyResponse = {
  content: string;
};

export type ChangePasswordRequest = {
  current_password: string;
  new_password: string;
}